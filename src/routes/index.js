import { Router } from "express";
import { registerUserRouter, loginUserRouter, logoutUserRouter, validateOtpRouter } from "./auth/index.js";
import { requireAuth } from "../middlewares/index.js";

export default () => {
    const app = Router();

    app.use("/user/register", registerUserRouter);
    app.use("/user/login", loginUserRouter);
    app.use("/user/validate-otp", validateOtpRouter);
    app.use("/user/logout", logoutUserRouter);
    app.get("/auth-test", requireAuth, (req, res) => { // TODO: Remove before production
        return res.json({ message: "Works" });
    });

    return app;
};