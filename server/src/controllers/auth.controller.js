const {asyncHandler}=require('../utils/asyncHandler.js')
const {ApiError}=require('../utils/apiError.js')
const {User}=require('../models/user.models.js')
const {apiResponse}=require('../utils/apiResponse.js')
var bcrypt = require('bcryptjs');
const registerUser=asyncHandler(async(req,res)=>{
     const {username,email,password}=req.body;

     if(!username||!email||!password){
         throw new ApiError(400,"All fields are required")
     }
     
     const existedUser=await User.findOne({
         $or:[{username},{email}]

     })


     if(existedUser){
        return new ApiError(409,"User with email or password already exist")
     }
    //  const newUser=new User({
    //       username,
    //       email,
    //       password
    //  })
    //  await newUser.save();
    const hashPassword=bcrypt.hashSync(password,10)
    const newUser=await User.create({
         username:username,
         email:email,
         password:hashPassword
    })

    if(!newUser){
        throw new ApiError(500,"Something went wrong while creating user")
    }

    return res.status(201).json(
       new apiResponse(200,newUser,"user registered successfully")
    )
    
})


module.exports={registerUser};