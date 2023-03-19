import Reply from "../models/reply.js";

export const addreply = async(req,res)=>{
  const role=req.user.role
  if (role !== "employee"){
    res.status(404).json("you ar not user you can't add reply")
  }
const commentid = req.params.id;
const userid = req.user.id;
  const { reply } = req.body;
  const newreply = await Reply.create({ commentid, userid ,reply });
    res.json({ message: "reply added successfully", newreply });
  };