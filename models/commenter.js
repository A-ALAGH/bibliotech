import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commenterschema = new Schema({
    bookid:{
        type:ObjectId,
        required:true
    },
    userid:{
        type:ObjectId,
        required:true
    },
    comment:{
        type:String,
        required:true
    }, 
    date:{
        type: Date, 
        default: Date.now ,
        required:true
    }
   
});

const Commenter = model('comment', commenterschema);
export default Commenter;
