const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName : { 
        type : String , 
        required : [true , 'Firstname is required.'],
        trim : true , 
        minLength : 3 , 
        maxLength: 15
    } ,
    lastName: { 
        type : String , 
        required : [true , 'Lastname is required.'],
        trim : true , 
        minLength : 3 , 
        maxLength: 15
    } ,
    email : { 
        type : String ,
        required : [true , 'Email is required.'] ,
        trim : true 
    } ,
    password : { 
        type : String , 
        required : [true , 'Password is required.']
    } ,
    profileImage : { 
        type : String ,
        default : 'https://uwswpa.org/wp-content/uploads/2015/07/default_profile_pic.jpg'
    } ,
    dateOfBirth : { 
        type : String , 
        required : [true , 'DateOfBirth is required.'] 
    } ,
    gender : {
        type : String ,
        required : [true , 'Gender is required.']
    } 

} , { timestamps : true });

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')){
        return ;
    } 
    this.password = await bcrypt.hash(this.password , 10);
    next();
});

userSchema.methods.comparePassword = async function(givenPassword) {
    return await bcrypt.compare(givenPassword , this.password)
}

const User = mongoose.model('User' , userSchema);
module.exports = User;