const express = require('express');
const { verifyToken } = require('../utils/verifyUser.js');
const {create}=require('../controllers/post.controller.js')
const {getpost}=require('../controllers/post.controller.js')
const {deletePost}=require('../controllers/post.controller.js');
const {updatePost}=require('../controllers/post.controller.js')
const postRouter=express.Router();
postRouter.post("/create",verifyToken,create);
postRouter.get('/getposts',getpost);
postRouter.delete('/deletepost/:postId/:userId',verifyToken,deletePost);
postRouter.put('/updatepost/:postId/:userId',verifyToken,updatePost);
module.exports=postRouter