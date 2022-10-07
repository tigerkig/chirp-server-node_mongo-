const AppError = require('./../utils/appError');
const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination : (req , file , cb) =>{
        cb(null , 'uploads/')
    },
    filename : (req , file , cb) =>{
        const ext = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
    }
});

const upload = multer({
   storage : multerStorage ,
});

module.exports = upload ;

