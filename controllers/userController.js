const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('../models/userModel');

exports.getProfile = catchAsync(async (req , res , next) => {
    const user = await User.findById(req.user._id);
    if(!user){
        return next(new AppError('User not found.' , 404))
    }
    return res.status(200).json({
        status : 'success' ,
        success : true ,
        data : {
            user 
        }
    })
});

exports.getAllUsers = catchAsync(async (req , res , next) => {
    const users = await User.find();
    return res.status(200).json({
        status : 'success' , 
        success : true ,
        data : {
            users : users.length > 0 ? users : 'No user found.'
        }
    })
});