const AppError = require('./../utils/appError');

const castErrorHandlerDB = err =>{
    const message = `invalid id ${err.value}`;
    return new AppError(message , 400)
}
  
const handleDuplicateFieldsErrorDB = err =>{
    const message = `duplicated Field value " ${err.keyValue.name}" , try another value.`;
    return new AppError(message , 400);
}
  
const handleValidationErrorDB = err =>{
    let errors = Object.values(err.errors).map(el => el.message );
    let message = `${errors.join('. ')}`;
    return new AppError(message , 400);
}
  
const handleJWTError = () =>{
    const message = 'invalid token provided , please login again';
    return new AppError(message , 401);
};
  
const handleExpiredTokenError = err =>{
    const message = 'your token has been expired now , please login again';
    return new AppError(message , 401);
};

const sendErrorDev = (err , req , res) => {
        return res.status(err.statusCode || 500).json({
            status : err.status || 'Error',
            success : false ,
            message : err.message || 'internal server error', 
            error : err ,
            stack : err.stack 
        })
}

const sendErrorProd = (err , req , res) => {
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status : err.status ,
            success : false ,
            message : err.message 
        })
    }
    console.log('error is not trusted : ' , err);
    return res.status(err.statusCode || 500).json({
        status : err.status || 'Error' ,
        success : false ,
        message : 'Something went wrong'
    })

}

const errorHandler = (err , req , res , next) => {
    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err , req , res);  

    }else if(process.env.NODE_ENV === 'production'){
        let error = { ...err };
        error.name =err.name; 
        error.message = err.message;

        if(error.name === 'CastError') { error = castErrorHandlerDB(error)} 
        if(error.code === 11000) { error = handleDuplicateFieldsErrorDB(error)}
        if(error.name === 'ValidationError') { error = handleValidationErrorDB(error)}
        if(error.name === 'JsonWebTokenError') { error = handleJWTError()}
        if(error.name === 'TokenExpiredError') { error = handleExpiredTokenError(error)}

        sendErrorProd(error , req , res);
    }
}

module.exports = errorHandler;