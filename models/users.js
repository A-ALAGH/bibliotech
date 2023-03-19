import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// const options = {
//     discriminatorKey : 'role',
//     timestamps:true 
// }
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    username:{
        type:String, 
        required:true, 
        unique : true
    },
    password:{
        type:String,
        required:true
    }, 
    adders:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['employee', 'user'],
        required:true
    },
    bookborrowed:{
        type:Number,
        required:true,
        min:0
    }
  
});
const User = model('User', userSchema);
export default User;
