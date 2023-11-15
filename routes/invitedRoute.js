const express=require("express")
const { registerValidation, Validator } = require("../middelware/validatorInvited")
const { register, getInvited} = require("../controllers/inviterController")



//require route
const router=express.Router()

//register
router.post('/register',registerValidation(),Validator,register)

// router.post('/invitephoto/:id',upload)

// router.delete('/invitephoto/:id',deleted)

//get all inviter
router.get('/getinviter',getInvited)

// router.post("/uploadimage/:_id",photoUpload.single("image"), profilePhotoUploadCtrl)


module.exports=router