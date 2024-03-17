const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser')

app.use(express.json());
app.use(cors());
app.use(express.json({limit:"160kb"})) //accept json in backend
app.use(express.urlencoded({extended:true,limit:"160kb"}))//for url 
app.use(express.static("public"))
app.use(cookieParser())


//import router
const authRouter=require('./routes/auth.route.js');
//console.log(authRouter)
app.use("/api/v1/user",authRouter);






module.exports={app};