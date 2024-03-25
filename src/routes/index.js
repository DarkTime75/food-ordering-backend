import { Router } from "express";
import { registerUserRouter, loginUserRouter, logoutUserRouter } from "./user/index.js";
import { validateOtpRouter } from "./otp/index.js";
import { requireAuth } from "../middlewares/index.js";

export default () => {
    const app = Router();

    // User Routes
    app.use("/user/register", registerUserRouter);
    app.use("/user/login", loginUserRouter);
    app.use("/user/logout", logoutUserRouter);

    // OTP Routes
    app.use("/otp/validate", validateOtpRouter);

    // Miscellaneous Routes
    app.get("/auth-test", requireAuth, (req, res) => { // TODO: Remove before production
        return res.json({ message: "Works" });
    });

    return app;
};