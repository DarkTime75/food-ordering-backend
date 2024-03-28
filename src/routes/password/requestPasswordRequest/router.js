import { Router } from "express";
import requestPasswordReset from "./controller.js";
import { StatusCodes } from "http-status-codes";

const requestPasswordResetRouter = Router();

const handleRequestPasswordReset = async (req, res) => {
    const response = await requestPasswordReset(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

requestPasswordResetRouter.post("/", handleRequestPasswordReset);

export default requestPasswordResetRouter;