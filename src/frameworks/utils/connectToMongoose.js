import mongoose from "mongoose";

export const connectToMongoose = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongoose connected... ${connection.connection.host}`);
    } catch (error) {
        console.log("An error occured", error);
    }
};