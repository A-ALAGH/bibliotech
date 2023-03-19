import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true 
    },
    author:{
        type:String,
        required:true,
    },
    category:{
        type: String,
        enum:['Adventure','Classics','Horror','War','Crime','Romance'],
        required: true
    }, 
    quantity:{
        type:Number,
        required:true,
        min:0
    }
});
const Book = model('Book', bookSchema);
export default Book;
