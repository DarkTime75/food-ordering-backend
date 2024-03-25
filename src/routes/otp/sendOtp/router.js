import { Router } from "express";
import sendOtp from "./controller.js";
import { StatusCodes } from "http-status-codes";

const sendOtpRouter = Router();

const handleSendOtp = async (req, res) => {
    const response = await sendOtp(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

sendOtpRouter.post("/", handleSendOtp);

export default sendOtpRouter;