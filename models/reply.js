import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const replyschema = new Schema({
    commentid:{
        type:ObjectId,
        required:true
    },
    userid:{
        type:ObjectId,
        required:true
    },
    reply:{
        type:String,
        required:true
    },
    date:{
        type: Date, 
        default: Date.now ,
        required:true
    }
   
});
const Reply = model('reply', replyschema);
export default Reply;