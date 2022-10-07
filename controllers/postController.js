const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Post = require('../models/postModel');

const sendCreatePostResponse = ( res , post ) => {
    return res.status(201).json({
        status : 'success' ,
        success : true ,
        data : {
            post 
        }
    })
}

exports.createPost = catchAsync(async (req , res , next) => {
    if(req.files.gif){
        const newPost = await Post.create({ 
            ...req.body ,
            gif : {
                mimetype : req.files.gif[0].mimetype ,
                filename : req.files.gif[0].filename 
            } ,
            user : req.user._id ,
        });
        sendCreatePostResponse(res , newPost);
    }else if(req.files.backgroundImage){
        const newPost = await Post.create({ 
            ...req.body ,
            backgroundImage : {
                mimetype : req.files.backgroundImage[0].mimetype ,
                filename : req.files.backgroundImage[0].filename 
            },
            user : req.user._id ,
        });
        sendCreatePostResponse(res , newPost);
    }else if(req.files.media){
        const newPost = await Post.create({ 
            ...req.body ,
            media : req.files.media.map(file => (
                {
                    mimetype : file.mimetype ,
                    filename : file.filename 
                }
            )),
            user : req.user._id ,
        });
        sendCreatePostResponse(res , newPost);
    }else {
        const newPost = await Post.create({ 
            ...req.body ,
            user : req.user._id ,
        });
        sendCreatePostResponse(res , newPost);
    }
});

exports.getPosts = catchAsync(async (req , res , next) => {
    const posts = await Post.find().populate('user' , 'firstName lastName email profileImage');
    return res.status(200).json({
        status : 'success' , 
        success : true ,
        data : {
            posts : posts.length > 0 ? posts : 'No Post found.'
        }
    })
})