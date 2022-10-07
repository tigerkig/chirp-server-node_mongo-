const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Story = require('../models/storyModel');

exports.createStory = catchAsync(async (req , res , next) => {
    if(req.body.storyType === 'media'){
        const media = req.file.filename;
        const newStory = await Story.create({
            user : req.user._id ,
            media , 
            storyType : req.body.storyType ,
        });
        return res.status(200).json({
            status : 'success' ,
            success : true ,
            data : {
                story : newStory
            }
        })
    }else if(req.body.storyType === 'text'){
        const newStory = await Story.create({
            user : req.user._id ,
            text : req.body.text, 
            storyType : req.body.storyType ,
        });
        return res.status(200).json({
            status : 'success' ,
            success : true ,
            data : {
                story : newStory
            }
        })
    }
})

exports.getMyStories = catchAsync(async (req , res , next) => {
    const stories = await Story.find({ user : req.user._id }).populate('user' , 'firstName lastName email profileImage')
    return res.status(200).json({
        status : 'success' ,
        success : true ,
        data : {
            stories
        }
    })
})
exports.getAllStories = catchAsync(async (req , res , next) => {
    const stories = await Story.find().populate('user' , 'firstName lastName email profileImage')
    return res.status(200).json({
        status : 'success' ,
        success : true ,
        data : {
            stories
        }
    })
})