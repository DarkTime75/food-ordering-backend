import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectToMongoose = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_DB}/${DB_NAME}`)
        console.log(`Mongoose connected... ${connection.connection.host}`);
    } catch (error) {
        console.log("An error occured", err);
    }
}

export default connectToMongoose;