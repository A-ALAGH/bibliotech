import Book from "../models/book.js";


// get all books
export const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};
// get contity
export const findcontityByName = async (req, res) => {
    const { name } = req.body;
    const books = await Book.find({ name });
    const quantities = books.map(book => book.quantity);
    res.json({message:`the number of books is ${quantities}`});
  };
// add book
export const addBook = async (req, res) => {
  const role=req.user.role
  if (role !== "employee"){
    res.status(404).json("not employee you can't add book")
  }
  const { name, author, category , quantity } = req.body;
  const book = await Book.create({ name, author ,category ,quantity });
  
  res.json({ message: "Book added successfully", book });
};
// delet a book
export const deleteBook = async (req, res) => {
  const role=req.user.role
  if (role !== "user"){
    res.status(404).json("not employee you can't add book")
  }
  const bookId = req.params.id;
  await Book.findByIdAndDelete(bookId);
  res.json({ message: "Book deleted successfully" });
}; 
// ======================================================================
// filtr by name

export const findBookByName = async (req, res) => {
  const { name } = req.body;
  const books = await Book.find({ name });
  if (!books) {
    res.json({ message: 'Book not found' });
    return;
  }
  res.json(books);
}
// filter by catigory
export const findBookBycatgory = async (req, res) => {
    const { category } = req.body;
    const books = await Book.find({ category });
    res.json(books);
  };
//   filtre by author
export const findBookByauthor = async (req, res) => {
    const { author } = req.body;
    const books = await Book.find({ author });
    res.json(books);
    };
export const bookstat = async (req,res) =>{
  const role=req.user.role
  if (role !== "user"){
    res.status(404).json("you need to be employee for geting the satates")
  }
  
}

 