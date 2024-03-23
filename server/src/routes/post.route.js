const express = require('express');
const { verifyToken } = require('../utils/verifyUser.js');
const {create}=require('../controllers/post.controller.js')

const postRouter=express.Router();
postRouter.post("/create",verifyToken,create);

module.exports=postRouter