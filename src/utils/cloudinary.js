import { v2 as cloudinary} from "cloudinary";
import fs from "fs"; 

console.log("Cloudinary configuration:", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary configuration:");

const uploadOnCloudinary = async (filePath) => {
    try {
        if(!filePath) return null;
            
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type: "auto",
        })
        console.log("File uploaded to Cloudinary successfully.", response.url);
        
        fs.unlinkSync(filePath)

        return response 
    }catch (error) {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file from local storage if upload fails
        }
        
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