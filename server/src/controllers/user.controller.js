const { apiError } = require("../utils/apiError.js")
var bcrypt = require('bcryptjs');
const { User } = require('../models/user.models.js')
const updateUser = async (req, res, next) => {
   // console.log(req.user)
    //console.log(req.body)
    if (req.user.id !== req.params.userId) {
        return next(apiError(403, 'You are not allowed to update this user.'))
    }
    if (req.body.password) {
        if (req.body.password < 6) {
            return next(apiError(400, 'Password must be at least 6 characters'))
        }
        
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            { new: true }
        );
        //console.log(updatedUser)
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        console.log("Error in user controller")
        next(error);
    }
};

const deleteUser=async(req,res,next)=>{
    //console.log(req)
    if(req.user.id!==req.params.userId){
         return next(apiError(403,'You are not allowed to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("user has been deleted")
    } catch (error) {
        console.log("Error in deleting user",error);
    }
}

const signout=(req,res,next)=>{
     try {
        //console.log(req);
        res.clearCookie('access_token')
        .status(200).json('user has been signed out')
     } catch (error) {
        next(error);
     }
}


module.exports = {signout, updateUser,deleteUser }