const express =require("express")
const connectDB=require("./config/connectDB")


const app=express()

app.use(express.json())

require('dotenv').config()

const PORT = process.env.PORT || 7666

connectDB()



app.listen(PORT, (error)=>{
  error?
  console.log(error)
  :console.log(`server is runnig on PORT ${PORT}`)
})

// require router
app.use('/api/inviter',require('./routes/invitedRoute'))

app.use((req,res)=>{
  res.send("Api is runnig")
})