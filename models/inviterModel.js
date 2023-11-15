const mongoose=require("mongoose")
const connectDB=require("../config/connectDB")

//create schema
const schema=mongoose.Schema

const invitedSchema=new schema({
  invitedname:{
    type:String,
    required:true
  },
  invitedlastname:{
    type:String,
    required:true,
  }
})

module.exports=mongoose.model("inviter",invitedSchema)