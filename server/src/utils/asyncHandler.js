// This file is made because we always talk to our database and wenhever we talk to databse we have to use async and try catch so this file is buld for the pupose that whenver we are taling to our database we will call this method only instead of writing the same code agin and again//

const asyncHandler=(requestHandler)=>{
   return (req,res,next)=>{
     Promise.resolve(requestHandler(req,res,next))
     .catch((err)=>next(err))
   }
}

module.exports={asyncHandler}