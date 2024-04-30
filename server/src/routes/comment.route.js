const express = require('express');
const commentRouter = express.Router();
const {createComment} = require('../controllers/comment.controller.js')
const {verifyToken} = require('../utils/verifyUser.js')
const {getPostComment}=require('../controllers/comment.controller.js')
const {likeComment}=require('../controllers/comment.controller.js');
commentRouter.post('/create',verifyToken,createComment);
commentRouter.get('/getpostcomment/:postId',getPostComment);
commentRouter.put('/likeComment/:commentId', verifyToken, likeComment);
module.exports=commentRouter