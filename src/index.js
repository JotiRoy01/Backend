//require("dotenv").config();
import dotenv from "dotenv";
import connectDB from "./db/index.js";
 
dotenv.config({
    path: "./.env"
});




connectDB();



























// import express from "express";
// (async () => {
//     try{
//         mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.log("Error while connecting to the database capture by express", error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })

//     } catch(error){
//         console.log("Error while connecting to the database", error)
//         throw error;
//     }
// })()