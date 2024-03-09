const mongoose = require('mongoose')
const { DB_NAME } = require('../constants.js')
//console.log(process.env.MONGODB_URI)
const dbConnect = async () => {
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMondoDb connected ! DB HOST:${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error in connection", error);
        throw error;
    }
}
module.exports={dbConnect};