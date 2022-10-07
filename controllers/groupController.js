const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Group = require('../models/groupModel');


exports.createGroup = catchAsync(async (req , res , next) => {
    const { name , privacy , description , members } = req.body;
    if(!name || !privacy || !description){
        return next(new AppError('Missing required credential.'))
    }
    let newGroup = await Group.create({ 
        name , privacy , description ,
        admin : req.user._id ,
        groupCoverImage : req.file.filename ,
        members 
    });
    const group = await Group.findById(newGroup._id)
    .populate({ 
        path : 'admin' , 
        select : "firstName lastName email profileImage"
    }).populate({
        path : 'members' ,
        populate : { 
            path : 'member', 
            select : 'firstName lastName email profileImage'
        }
    })
    return res.status(200).json({
        status : 'success' ,
        success : true ,
        data : {
            group
        }
    })
});

exports.getMyGroups = catchAsync(async (req , res , next) => {
    const groups = await Group.find({ admin : req.user._id }).populate({
        path : 'admin' ,
        select : "firstName lastName email profileImage"
    })
    .populate({
        path : 'members' ,
        populate : { 
            path : 'member' , 
            select : 'firstName lastName email profileImage'
        }
    });;
    return res.status(200).json({
        status : 'success' ,
        success : true ,
        data : {
            groups : groups.length > 0 ? groups : 'No Group found.'
        }
    })
});

exports.getAllGroups = catchAsync(async (req , res , next) => {
    const groups = await Group.find().populate({
        path : 'admin' ,
        select : "firstName lastName email profileImage"
    })
    .populate({
        path : 'members' ,
        populate : { 
            path : 'member' , 
            select : 'firstName lastName email profileImage'
        }
    });;
    return res.status(200).json({
        status : 'success' ,
        success : true ,
        data : {
            groups : groups.length > 0 ? groups : 'No Group found.'
        }
    })
});

exports.getSingleGroup = catchAsync(async (req , res , next) => {
    const { id } = req.params;
    const group = await Group.findById(id).populate('admin' , 'firstName lastName email profileImage');
    if(!group){
        return next(new AppError('Group not found' , 404))
    }
    return res.status(200).json({
        status : "success" ,
        success : true ,
        data : {
            group 
        }
    })
})