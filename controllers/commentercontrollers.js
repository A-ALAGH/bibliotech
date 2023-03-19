import Commenter from "../models/commenter.js";
import Reply from "../models/reply.js";

export const addcomment = async(req,res)=>{
  const role=req.user.role
  if (role !== "employee"){
    res.status(404).json("you ar not user you can't add comment")
  }
const bookid = req.params.id;
const userid = req.user.id;
  const { comment } = req.body;
  const Comment = await Commenter.create({ bookid, userid ,comment });
    res.json({ message: "comment added successfully", Comment });
  };

  export const deletecomment = async (req, res) => {
     const role = req.user.role
  if (role !== "employee"){
    res.status(404).json("you ar not user you can't add comment")
  }
    const commentid = req.params.id;
    await Commenter.findByIdAndDelete(commentid);
    await Reply.deleteMany({commentid});
   
    res.json({ message: "comment deleted successfully" });
  }; 