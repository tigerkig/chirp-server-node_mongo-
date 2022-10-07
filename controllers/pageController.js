const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Page = require('../models/pageModel');

exports.createPage = catchAsync(async (req , res , next) => {
    const { name , privacy , description , members } = req.body;
    const { pageProfileImage , pageCoverImage } = req.files;
    if(!name || !privacy || !description || !members || !pageProfileImage || !pageCoverImage){
        return next(new AppError('Missing required credentials' , 400))
    }
    const newPage = await Page.create({ 
        name , privacy , description , members ,
        admin : req.user._id ,
        pageProfileImage : pageProfileImage[0].filename,
        pageCoverImage : pageCoverImage[0].filename,
    });
    const page = await Page.findById(newPage._id)
    .populate({
        path : 'admin' ,
        select : "firstName lastName email profileImage"
    })
    .populate({
        path : 'members' ,
        populate : { 
            path : 'member' , 
            select : 'firstName lastName email profileImage'
        }
    });

    return res.status(201).json({
        status : 'success' ,
        success : true ,
        data : {
            message : "Page created successfully." ,
            page 
        }
    })
});

exports.getMyPages = catchAsync(async (req , res , next) => {
    const pages = await Page.find({ admin : req.user._id }).populate({ 
        path : 'admin' ,
        select : 'firstName lastName email profileImage'
    }).populate({
        path : 'members' ,
        populate : { 
            path : 'member', 
            select : 'firstName lastName email profileImage'
        }
    });
    return res.status(200).json({
        status : 'success' ,
        success : true ,
        data : {
            pages : pages.length > 0 ? pages : 'No page found.'
        }
    })
});

exports.getAllPages = catchAsync(async (req , res , next) => {
    const pages = await Page.find().populate({ 
        path : 'admin' ,
        select : 'firstName lastName email profileImage'
    }).populate({
        path : 'members' ,
        populate : { 
            path : 'member', 
            select : 'firstName lastName email profileImage'
        }
    });
    return res.status(200).json({
        status : 'success' ,
        success : true ,
        data : {
            pages : pages.length > 0 ? pages : 'No page found.'
        }
    })
});

exports.getSinglePage = catchAsync(async (req , res , next) => {
    const { id } = req.params;
    const page = await Page.findById(id).populate('admin' , 'firstName lastName email profileImage');
    if(!page){
        return next(new AppError('page not found' , 404))
    }
    return res.status(200).json({
        status : "success" ,
        success : true ,
        data : {
            page 
        }
    })
})