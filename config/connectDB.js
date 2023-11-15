const { default: mongoose } = require("mongoose")


const connectDB = async()=>{
  try {
    const conn =await mongoose.connect(process.env.MONGO_URL)
    console.log(`MONGO DB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    
  }
}
module.exports=connectDB