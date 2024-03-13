import { Router } from "express";
import { registerUserRouter } from "./auth/index.js";

export default () => {
    const app = Router();

    app.use("/home", registerUserRouter)

    return app;
}