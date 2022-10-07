class AppError extends Error {
   constructor(message , statusCode){
      super(message);
      this.statusCode = statusCode || 500;
      this.status = `${this.statusCode}`.startsWith('4') ? 'Failed' : 'Error';
      this.isOperational = true;
      this.stack = Error.captureStackTrace(this , this.constructor);
   }
}

module.exports = AppError;