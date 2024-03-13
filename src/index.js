import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

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


app.use("foodapp/home", router);

