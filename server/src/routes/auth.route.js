const express = require('express');
const authRouter = express.Router();
const {registerUser}=require('../controllers/auth.controller.js');


authRouter.post("/signup",registerUser);

module.exports=authRouter;