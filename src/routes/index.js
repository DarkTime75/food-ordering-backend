import { Router } from "express";
import { registerUserRouter, loginUserRouter, logoutUserRouter } from "./user/index.js";
import { validateOtpRouter, sendOtpRouter } from "./otp/index.js";
import { requestPasswordResetRouter, resetPasswordRouter } from "./password/index.js";
import { listRestaurantsRouter, getRestaurantMenusRouter } from "./restaurant/index.js";
import { requireAuth } from "../middlewares/index.js";

export default () => {
    const app = Router();

    // User Routes
    app.use("/user/register", registerUserRouter);
    app.use("/user/login", loginUserRouter);
    app.use("/user/logout", requireAuth, logoutUserRouter); // To logout, you must be logged in

    // OTP Routes
    app.use("/otp/send", sendOtpRouter);
    app.use("/otp/validate", validateOtpRouter);

    // Password Routes
    app.use("/password/request-reset", requestPasswordResetRouter);
    app.use("/password/reset", resetPasswordRouter);

    // Restaurant Routes
    app.use("/restaurants/list", listRestaurantsRouter); // To list restaurants
    app.use("/restaurants/menus", getRestaurantMenusRouter); // To list restaurant menus,

    return app;
};