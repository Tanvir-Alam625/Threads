/**
 * Mongoose Configuration
 * @description Mongoose Configuration
 * @param mongoose - The mongoose model
 * @returns The connection to the MongoDB database
*/
import mongoose from "mongoose"

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) {
        console.error("Not Found MongoDB URL");
        return;
    }
    if (isConnected) {
        console.log("Already Connect to Mongodb");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true
        console.log("Connected MongoDB");


    } catch (error) {
        console.error("Error:", error)
    }
}