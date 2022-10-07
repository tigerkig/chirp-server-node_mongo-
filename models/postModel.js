const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user : { 
        type : mongoose.Schema.ObjectId ,
        ref : 'User' , 
        required : true 
    } ,
    text : { 
        type : String ,
    } ,
    postType : { 
        type : String ,
        enum : ["bg" , "media" , "gif" , "text"],
        default : 'text'
    } ,
    backgroundImage : { 
        type : Object ,
    },
    gif : { 
        type : Object ,
    } ,
    media : { 
        type : [{}],
    } ,
    location : { 
        type : String , 
    } ,
    tags : [
        {
            type : mongoose.Schema.ObjectId ,
            ref : "User"
        }
    ] , 
    privacy : { 
        type : String  ,
        default : 'public'
    } ,
    isBlocked : { 
        type : Boolean ,
        default : false ,
    }

} , { timestamps : true });

const Post = mongoose.model('Post' , postSchema);
module.exports = Post ;