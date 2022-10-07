const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    storyType : {
        type : String , 
        enum : ['text' , 'media']
    },
    user : {
        type : mongoose.Schema.ObjectId ,
        ref : "User" ,
        required : true
    },
    text : {
        type : String
    } ,
    media : {
        type : String
    }

} , { timestamps : true})


const Story = mongoose.model('Story' , storySchema);
module.exports = Story;