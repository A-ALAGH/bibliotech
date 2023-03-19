import mongoose from "mongoose";
const { Schema, model } = mongoose;
// const options = {
//     discriminatorKey : 'role',
//     timestamps:true 
    
// }
const borrowSchema = new Schema({
    bookname:{
        type:String,
        required:true,
    },
    borrowedby:{
        type:String,
        required:true,
    },
    date: {
        type: Date, 
        default: Date.now ,
        required:true,
    },
    dateexp:{
        type: Date,
        default: function() {
          return new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
        }
      }
    
}); 
const Borrow = model('Borrow', borrowSchema);
export default Borrow;
