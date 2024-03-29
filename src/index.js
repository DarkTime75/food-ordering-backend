import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import "dotenv/config";
import { connectToMongoose, validateEnv } from "./frameworks/utils/index.js";

validateEnv();

const app = express();

await connectToMongoose();

// middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  withCredentials: true,
}));
app.use(cookieParser());
app.use(express.json({
  limit: "20kb",
}));
app.use(express.urlencoded({
  extended: false,
}));

app.use(routes());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

