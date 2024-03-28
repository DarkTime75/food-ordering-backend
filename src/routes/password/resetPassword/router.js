import { Router } from "express";
import resetPassword from "./controller.js";
import { StatusCodes } from "http-status-codes";

const resetPasswordRouter = Router();

const handleResetPassword = async (req, res) => {
    const response = await resetPassword(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

resetPasswordRouter.post("/", handleResetPassword);

export default resetPasswordRouter;