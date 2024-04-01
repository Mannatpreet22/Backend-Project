import {v2 as cloudinary} from 'cloudinary';    // used for uploading files to the server (cloudinary server)
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadFileOnCloudinary = async (filePath) =>{
    try {
        if(!filePath)   return null
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type : 'auto'
        })
        console.log('File has been uploaded successfully!',response.url);
        return response
    } 
    catch (error)
    {
        fs.unlinkSync(filePath) // remove the locally saved temporary file as the upload operation failed
    }
}

export {uploadFileOnCloudinary}