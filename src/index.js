import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import "dotenv/config";
import { connectToMongoose } from "./frameworks/utils/index.js";

const app = express();

await connectToMongoose();

// middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN }, { credentials: true }));
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

