const { ApiError } = require("../utils/apiError");
const {Comment}=require('../models/comment.model.js')
const createComment=async(req,res,next)=>{
   try {
       const {content,postId,userId}=req.body;
       if(userId!=req.user.id){
         return next(ApiError(403,'You are not allowed to create this comment'));
       }

       const newComment=new Comment({
        content,
        postId,
        userId
       });

       await newComment.save();
       res.status(200).json(newComment);
   } catch (error) {
      next(error);
   }
}


const getPostComment=async(req,res,next)=>{
     try {
         const comments=await Comment.find({postId:req.params.postId}).sort({
            creatdAt:-1,
         });
         res.status(200).json(comments);
     } catch (error) {
         next(error);
     }
}

 const likeComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(ApiError(404, 'Comment not found'));
      }
      const userIndex = comment.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.numberOflikes += 1;
        comment.likes.push(req.user.id);
      } else {
        comment.numberOflikes-= 1;
        comment.likes.splice(userIndex, 1);
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };

module.exports = {createComment,getPostComment,likeComment};