const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        trim : true 
    } ,
    privacy : {
        type : String ,
        required : true ,
        default : 'public',
        enum : ['public' , 'private']
    } ,
    pageCoverImage : {
        type : String,
        required : true ,
    },
    pageProfileImage : {
        type : String ,
        required : true 
    }, 
    admin : {
        type : mongoose.Schema.ObjectId ,
        ref : "User" ,
        required : [true]
    } ,
    description : {
        type : String ,
        required : true 
    } ,
    members : [
        {
            member : {
                type : mongoose.Schema.ObjectId ,
                ref : "User"
            }
        }
    ]
}, { timestamps : true });

const Page = mongoose.model('Page' , pageSchema);
module.exports = Page;