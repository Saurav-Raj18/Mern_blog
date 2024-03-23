const express=require('express')
const {verifyToken} = require('../utils/verifyUser.js')
const {updateUser} = require('../controllers/user.controller.js');
const {deleteUser} = require('../controllers/user.controller.js');
const {signout}=require('../controllers/user.controller.js')
const userRouter=express.Router();

userRouter.put('/update/:userId',verifyToken,updateUser);
userRouter.delete('/delete/:userId',verifyToken,deleteUser);
userRouter.post('/signout',signout);

module.exports =userRouter;