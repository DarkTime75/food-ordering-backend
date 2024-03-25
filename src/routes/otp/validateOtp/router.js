import { Router } from "express";
import validateOtp from "./controller.js";
import { StatusCodes } from "http-status-codes";

const validateOtpRouter = Router();

const handleValidateOtp = async (req, res) => {
    const response = await validateOtp(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

validateOtpRouter.post("/", handleValidateOtp);

export default validateOtpRouter;