const { ApiError } = require("../utils/apiError.js")
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

const deleteUser = async (req, res, next) => {
    //console.log(req)
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(ApiError(403, 'You are not allowed to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("user has been deleted")
    } catch (error) {
        console.log("Error in deleting user", error);
    }
}

const signout = (req, res, next) => {
    try {
        //console.log(req);
        res.clearCookie('access_token')
            .status(200).json('user has been signed out')
    } catch (error) {
        next(error);
    }
}


const getUsers = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(ApiError(403, 'You are not allowed to see all the users'))
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
    } catch (error) {
        next(error);
    }
};

const getUser=async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.userId);
        if(!user)return next(ApiError(404,'user not found'));
        const {password,...rest}=user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

module.exports = { signout, updateUser, deleteUser, getUsers,getUser }