import { getDate } from 'date-fns';
import Book from '../models/book.js';
import Borrow from '../models/borrow.js';

// borrowing a book
export const borrow = async (req, res) => {
  const role=req.user.role
  if (role !== "employee"){
    res.status(404).json("not employee you can't add book")
  }
  const { id } = req.params;
  try {
    // Check if the ID exists
    const book = await Book.findById(id);
    const nbook = book.name;
    const uname = req.user.username
    console.log(nbook + uname)
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if available
    if (book.quantity === 0) {
      return res.status(400).json({ error: 'Book not available for borrowing' });
    }

    // Decrement the quantity 
    const updatedBook = await Book.findOneAndUpdate(
      { _id: id, quantity: { $gt: 0 } },
      { $inc: { quantity: -1 } },
      { new: true }
    );

    // Create borrowing 
    const borrow = new Borrow({
      borrowedby: uname,
      bookname: nbook,
      date: new Date(),
    });

    // Save the borrowing record to the database
    await borrow.save();

    // Return a success message to the user
    return res.json({ message: 'Book borrowed '+ nbook +' successfully to ' + uname, borrow });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export const borrowhistorique = async (req,res)=>{
  const role=req.user.role
  if (role !== "employee"){
    res.status(404).json("not user you can't have your historique")
  }
  const  borrowedby =  req.user.username;
  const result= await Borrow.find({borrowedby});
  res.json({'your historique is': result})
}
export const expenddate = async (req,res)=>{
  const role=req.user.role
  if (role !== "employee"){
    res.status(404).json("not employee you can't add book")
  }
  const borrowid = req.params.id;
  
  const goog = await Borrow.findById(borrowid);
  console.log(goog.dateexp)
  const  datenow = Date() > goog.dateexp;
  if(datenow == true){
    res.json('your dommend can not be taken')
  }
  goog.dateexp =goog.dateexp.getTime() +  864000000
  await goog.save()
  console.log(goog.dateexp)
  res.json('your borrow has ben extended')
}