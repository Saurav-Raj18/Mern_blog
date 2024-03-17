const { asyncHandler } = require('../utils/asyncHandler.js')
const { ApiError } = require('../utils/apiError.js')
const { User } = require('../models/user.models.js')
const { apiResponse } = require('../utils/apiResponse.js')

var bcrypt = require('bcryptjs');//imported bcrypt library for password encryption
var jwt = require('jsonwebtoken');//jwt is bearer token for authentication
const { name } = require('tar/lib/types.js');

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        next(ApiError(400, "All fields are required"))
    }

    //searching in the database if user is already there or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]

    })
    //checking if the user is already registered
    if (existedUser) {
        next(ApiError(409, "User with email or password already exist"))
    }
    //  const newUser=new User({
    //       username,
    //       email,
    //       password
    //  })
    //  await newUser.save();


    //making password encrypted:
    const hashPassword = bcrypt.hashSync(password, 10)

    const newUser = await User.create({
        username: username,
        email: email,
        password: hashPassword
    })

    if (!newUser) {
        next(ApiError(500, "Something went wrong while creating user"))
    }

    return res.status(201).json(
        new apiResponse(200, newUser, "user registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res, next) => {
    
    const { username, password } = req.body;
    if (!username || !password) {
        next(ApiError(400, "All fields are required"))
    }
    try {
        const validUser = await User.findOne({ username })
        if (!validUser) {
            // res.status(404).json("User not found!!!")
           // next(ApiError(404, "User not found!!!"))
            res.status(404).json({
                success:false,
                message: "User not found"
            })
        }

        const validpassword = bcrypt.compareSync(password, validUser.password)
        //console.log(validpassword)
        if (!validpassword) {
            //console.log(validpassword)
            res.status(400).json({
                success:false,
                message:"Invalid password",
            })
            //console.log("password mismatch!!!")
            //return next(ApiError(400, "invalid password"))
        }
        else {
            //setting cookie.
            /*
            jwt.sign({ id: validUser._id }, process.env.JWT_SECRET): This part generates a JSON Web Token (JWT) using the jwt.sign() method from the jsonwebtoken library. It signs the payload { id: validUser._id } with the secret key stored in the environment variable JWT_SECRET. This payload typically contains information about the user or any other relevant data. The resulting JWT is stored in the token variable.
    
           res.status(200).cookie("access_token", token, { httpOnly: true }): This line sets a cookie named "access_token" in the response. The cookie's value is the JWT generated earlier and stored in the token variable. Additionally, the httpOnly option is set to true, which ensures that the cookie is accessible only via HTTP(S) and cannot be accessed by client-side JavaScript. The status of the response is set to 200 (OK).
    
          .json("signin successfull"): Finally, the response is sent back to the client in JSON format with the message "signin successfull". This message indicates that the sign-in process was successfu*/

            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
            
            const { password: pass, ...rest } = validUser._doc;

            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            }).json(rest);

        }
    }
    catch (error) {
        console.log("Error in searching userdata", error)
        next(error);
    }
})


 const google=async(req,res,next)=>{
     const {email,name,googlePhotoUrl}=req.body
     //console.log(email,password,googlePhotoUrl)
     try {
        const user=await User.findOne({email})
        //console.log(user)
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=user._doc;
            res.status(200).cookie("access_token",token,{
                httpOnly:true,
            }).json(rest)
        }
        else {
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcrypt.hashSync(generatedPassword,10);
            const newUser=await User.create({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoUrl,

            });
            await newUser.save();
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password,...rest}=newUser._doc;
            
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest)
        }

     } catch (error) {
        console.log(error)
        next(error)
     }
 }
module.exports = { registerUser, loginUser,google };