const express = require('express');
const commentRouter = express.Router();
const {createComment} = require('../controllers/comment.controller.js')
const {verifyToken} = require('../utils/verifyUser.js')

commentRouter.post('/create',verifyToken,createComment);
module.exports=commentRouter