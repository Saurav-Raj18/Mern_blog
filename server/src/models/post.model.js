const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
     userId:{
        type:String,
        required:true,
     },
     content:{
        type:String,
        required:true,
     },
     title:{
         type:String,
         required:true,
         unique:true,
     },
     image:{
         type:String,
         default:'https://www.appliedart.com/assets/images/blog/blogging-SMB.png',

     },
     category:{
        type:String,
        default:'uncategorized',
     },
     slug:{
        type:String,
        required:true,
        unique:true,
     }
},{timestamps:true})

const Post=mongoose.model('Post',postSchema);

module.exports={Post};
