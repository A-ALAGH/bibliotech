import  express   from 'express';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser';
import {validateToken} from './JWT.js';
import { login, register , profil } from './controllers/userscontrollers.js'
import { addBook, deleteBook, findBookByauthor, findBookBycatgory, findBookByName, findcontityByName } from './controllers/bookcontrollers.js';
import { borrow, borrowhistorique, expenddate } from './controllers/borrowcontrollers.js';
import { addcomment, deletecomment } from './controllers/commentercontrollers.js';
import { addreply } from './controllers/replycontrollers.js';
const app=express();


// Hide Mongoose deprecation warnings++++++++++++++++++++++++++++++
mongoose.set('strictQuery', true);

 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cookieparser());
//  login signin ++++++++++++++++++++++++++++++++++++++++++++++++++++
app.post('/register',register);
app.post('/login',login);
app.get('/profil',validateToken,profil);


 //  CRUD de la librerai ++++++++++++++++++++++++++++++++++++++

 app.post('/books/add',validateToken,addBook);  
 app.delete('/books/delet/:id',validateToken,deleteBook);
 app.post('/books/findcatigory',validateToken,findcontityByName);  
 
 
 
//  find book by name ++++++++++++++++++
 app.post('/books/findbyname',validateToken,findBookByName);
 app.post('/books/findbyauthor',validateToken,findBookBycatgory);
 app.post('/books/findbycatgory',validateToken,findBookByauthor); 

//  borrow books
 app.post('/borrow/:id',validateToken,borrow);
// commenter
app.post('/addcomment/:id',validateToken,addcomment);
app.delete('/delitecomment/:id',validateToken,deletecomment);
// reply
app.post('/addreply/:id',validateToken,addreply);
// historique
app.post('/historique',validateToken,borrowhistorique);


// expendate
app.post('/expand/:id',validateToken,expenddate);



// mongo atlas connection +++++++++++++++++++++++
mongoose.connect("mongodb+srv://Abbas:abbas@bibliotech.wr1y9ku.mongodb.net/BibliotechDB?retryWrites=true&w=majority").then(()=>{
app.listen(3000, ()=>{console.log('http://localhost:3000/MongoDB Connected')});
}); 

