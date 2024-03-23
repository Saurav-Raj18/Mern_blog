const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser')

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,

}));
app.use(express.json({limit:"160kb"})) //accept json in backend
app.use(express.urlencoded({extended:true,limit:"160kb"}))//for url 
app.use(express.static("public"))
app.use(cookieParser())


//import router
const authRouter=require('./routes/auth.route.js');
const userRouter=require('./routes/user.route.js')
const postRouter=require('./routes/post.route.js')

//console.log(authRouter)
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);

module.exports={app};