import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

//const dns = require("dns");
import dns from "node:dns";

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
    ]);

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\nMongoDB connected ! DB HOST: 
            ${connectionInstance.connection.host}\n`);
    } catch(error){
        console.log("Error while connecting to the database", error)
        process.exit(1);
    }
}

export default connectDB;