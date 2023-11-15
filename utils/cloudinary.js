

require("dotenv").config()
const cloudinary =require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// uploadToCloudinary = (path, folder) => {
//   return cloudinary.uploader.upload(path, {
//       folder
//   }).then((data) => {
//       return { url: data.url, public_id: data.public_id };
//   }).catch((error) => {
//       console.log(error)
//   })
// }

// removeFromCloudinary = async (public_id) => {
//   await cloudinary.uploader.destroy(public_id, function (error, result) {
//       console.log(result, error)
//   })
// }

// module.exports = { uploadToCloudinary, removeFromCloudinary }





const cloudinaryUploadImage = async(fileToUpload)=>{
  try {
    const data= await cloudinary.uploader.upload(fileToUpload, {
      resource_type: 'auto',
    })
    return data
  } catch (error) {
    return error
  }
}

const cloudinaryRemoveImage = async(imagePublicId)=>{
  try {
    const result= await cloudinary.uploader.destroy(imagePublicId)
    return result
  } catch (error) {
    return error
  }
}





module.exports={cloudinaryUploadImage,cloudinaryRemoveImage}