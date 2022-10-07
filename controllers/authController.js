const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (payload) => {
    return  jwt.sign(payload , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

const sendCookie = (res , token) => {
    let cookieOptions =  {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
    if(process.env.NODE_ENV === "production") cookieOptions.secure = true ;
    return res.cookie('token' , token  , cookieOptions  );
}


exports.register = catchAsync(async(req , res , next) => {
    const { firstName , lastName , email , password , gender , dateOfBirth } = req.body;
    if(!firstName || !lastName || !email || !password || !gender || !dateOfBirth){
        return next(new AppError('Missing required credentials. Make sure to fill all the fields.' , 400))
    }
    const userExist = await User.findOne({ email });
    if(userExist){
        return next(new AppError('This email is already taken.' , 400))
    }
    const newUser = await User.create({ 
        firstName , lastName , email , password , dateOfBirth , gender
    })
    const token = signToken({ _id : newUser._id });
    sendCookie(res , token);
    return res.status(201).json({
        status : 'success' ,
        success : true , 
        data : { 
            message : "Registeration successful.",
            user : newUser ,
            token
        }
    })
}) ;

exports.login = catchAsync(async (req , res , next) => {
    const { email , password } = req.body;
    if(!email || !password){
        return next(new AppError('Missing required credentials.' , 400))
    }
    const user = await User.findOne({ email });
    if(!user || !(await user.comparePassword(password))){
        return next(new AppError('Wrong email or password.' , 400))
    }
    const token = signToken({ _id : user._id });
    sendCookie(res , token);
    return res.status(200).json({
        status : 'success' ,
        success : true , 
        data : { 
            message : "Logged in successfully." , 
            user , 
            token 
        }
    })
    
})