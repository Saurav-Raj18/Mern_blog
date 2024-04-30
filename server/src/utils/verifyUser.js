const apiError=require('./apiError.js')
var jwt = require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
     // console.log("verifyToken")
      console.log(req.cookies);
      //console.log(req.cookies)
      const token=req.cookies.access_token;
      if(!token){
         return next(apiError(401,'unauthorized'));
      }
      jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
           return next(apiError(401,'unauthorized'));
        }
       //console.log(user)
        req.user=user;
        next();
      });
}
module.exports={verifyToken};