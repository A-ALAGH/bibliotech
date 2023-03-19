import User from "../models/users.js";
import {createTokens, validateToken} from '../JWT.js';
import bcrypt from 'bcrypt';
// Register =============================================

export const register = async (req, res) => {
    const { name, firstname , username , password , adders , role , bookborrowed } = req.body;
    bcrypt.hash(password, 10).then(async (password)=>{
        const user = await User.create({ name, firstname, username , password , adders , role ,bookborrowed });
        res.json({ message: "User added successfully", user });
    }).catch((err)=>{
        res.status(400).json({message:err.message}) 
    });
   
  };
// log in +========================================================
export const login = async(req,res)=>{
    const {username,password}= req.body;
    const user = await User.findOne({username : username});
    if(!user) {
        res.status(400).json({error:'user not fond'});
        return
    } 
    const dbPassword = user.password
    bcrypt.compare(password,dbPassword).then((match)=>{
        if(!match){
            res.status(400).json({error:'user and pass not matching'})
        }else{

            const accessToken = createTokens(user);

            res.cookie("access-token",accessToken,{
                maxAge:60*60*24*30*1000
            });

            res.json('LOGGED IN'); 
        }
    });
    
}
// afcher le profil ++++++++++++++++=======================+++++============
export const profil = async (req, res) => {
    const utilisateur = await User.findById(req.user.id)
    res.status(200).json(utilisateur)
  };
