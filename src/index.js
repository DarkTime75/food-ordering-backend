import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import mongoose from "mongoose";
import { User } from "../db/models/users.js";

const app = express();
// mongoose.connect("mongodb+srv://suryaraj04266:Surya2212@clusterbackend.n0p1ajr.mongodb.net").then(() => { console.log("mongoose connected") }).catch(() => { console.log("Failed to connect mongoose") });

// await User.create({
//     first_name: "Ojaswit",
//     last_name: "qoi",
//     phone_no: "9234567890",
//     email: "ojha@gmail.com",
//     password: "945h38765"
// }).then(() => { console.log("succesfully created user") })

// middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN }, { credentials: true }));
app.use(cookieParser())
app.use(express.json({
    limit: "20kb"
}));
app.use(express.urlencoded({
    extended: false
}))


app.use("foodapp/home", router);

