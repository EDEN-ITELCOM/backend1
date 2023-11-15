const inviter=require("../models/inviterModel")
const path =require("path")
const fs =require("fs")
const asyncHandler = require("express-async-handler")
const multer =require('multer')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary")





exports.register=async(req,res)=>{
  try {
    const {invitedname,invitedlastname}=req.body
    
    const findinvited=await inviter.findOne({invitedname})
    if (!findinvited){
        const newinvited= new inviter(req.body)
        
        await newinvited.save()
        res.status(200).send({msg:"invited successfuly registred",newinvited})    
    }else{
        res.status(400).send("invited already exists")
    }
  } catch (error) {
    res.status(500).send("error on register",error)
  }
}

exports.getInvited=async(req,res)=>{   
  try {
     const invitedd= await inviter.find()
  res.status(200).send({msg:"inviter found successfuly",invitedd})
  
  } catch (error) {
      res.status(500).send({msg:"error on getting the inviter",error})  
  }
  
  }

  // exports.upload=async (req, res) => {
  //   try {
  //     //Upload Image to Cloudinary
  //     const data = await uploadToCloudinary(req.file.path, "user-images");
  //     //Save Image Url and publiId ti the database
  //     const savedImg = await inviter.updateOne(
  //       { _id: req.params.id },
  //       {
  //         $set: {
  //           imageUrl: data.url,
  //           publicId: data.public_id,
  //         },
  //       }
  //     );
  
  //     res.status(200).send("inviter image uploaded with success!");
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  // }

  // exports.deleted=async (req, res) => {
  //   try {
  //     //Find user
  //     const invitt = await inviter.findOne({ _id: req.params.id });
  //     //Find it's publicId
  //     const publicId = invitt.publicId;
  //     //Remove it from cloudinary
  //     await removeFromCloudinary(publicId);
  //     //Remove it from the Database
  //     const deleteImg = await inviter.updateOne(
  //       { _id: req.params.id },
  //       {
  //         $set: {
  //           imageUrl: "",
  //           publicId: "",
  //         },
  //       }
  //     );
  //     res.status(200).send("inviter image deleted with success!");
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  // }


  exports.profilePhotoUploadCtrl=async(req,res)=> {
    let {_id}=req.params
    if(!req.file){
      return res.status(400).send({msg: "no file provied"})
    }
     const imagePath =path.join(__dirname, `../images/${req.file.filename}`)
    const result = await cloudinaryUploadImage(imagePath)
    console.log(result)
    const inviterr = await inviter.findById({_id})
    if(inviterr.invitephoto.publicId !==null){
      await cloudinaryRemoveImage(inviterr.invitephoto.publicId)
    }
    inviterr.invitephoto ={
      url: result.secure_url,
      publicId: result.public_id,
    }
    await inviterr.save()

    res.status(200).send({msg: "photo de profile upload successfully",inviterr, invitephoto: {url:result.secure_url, publicId:result.public_id}})
    fs.unlinkSync(imagePath)
  }