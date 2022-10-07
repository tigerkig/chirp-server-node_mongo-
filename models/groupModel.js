const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
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
    groupCoverImage : {
        type : String,
        required : true ,
    } ,
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

const Group = mongoose.model('Group' , groupSchema);
module.exports = Group;