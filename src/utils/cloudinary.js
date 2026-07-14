import { v2 as cloudinay} from "cloudinary";
import fs from "fs"; 



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (filePath) => {
    try {
        if(!filePath) {
            throw new Error("File path and folder name are required for uploading to Cloudinary.");
        } 
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type: "auto",
        })
        console.log("File uploaded to Cloudinary successfully.", response.url);
        return response 
    }catch (error) {
        fs.unlinkSync(filePath); // Delete the file from local storage if upload fails
        
        return null;
    }
}



export { uploadOnCloudinary };

// cloudinary.v2.uploader
// .upload("dog.mp4", {
//   resource_type: "video", 
//   public_id: "my_dog",
//   overwrite: true, 
//   notification_url: "https://mysite.example.com/notify_endpoint"})
// .then(result=>console.log(result));