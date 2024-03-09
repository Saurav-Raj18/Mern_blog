require('dotenv').config()
const {dbConnect}=require('./db/index.js')
const {app}=require('./app.js')
const port=process.env.PORT||3000;

dbConnect()
.then(()=>{
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
}).catch((err)=>{
    console.log("MongoDb connection failed",err)
})