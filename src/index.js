import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

// middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN }, { credentials: true }));
app.use(cookieParser())
app.use(express.json({
    limit: "20kb"
}));
app.use(express.urlencoded({
    extended: false
}))


import router from "./routes/routes.js"
app.use("foodapp/home", router);

