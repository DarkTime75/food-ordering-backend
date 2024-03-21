import { Router } from "express";
import { registerUserRouter, loginUserRouter, validateOtpRouter } from "./auth/index.js";

export default () => {
    const app = Router();

    app.use("/user/register", registerUserRouter);
    app.use("/user/login", loginUserRouter);
    app.use("/user/validate-otp", validateOtpRouter);

    return app;
};