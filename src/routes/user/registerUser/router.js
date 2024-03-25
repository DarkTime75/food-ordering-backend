import { Router } from "express";
import registerUser from "./controller.js";
import { StatusCodes } from "http-status-codes";

const registerUserRouter = Router();

const handleRegisterUser = async (req, res) => {
    const response = await registerUser(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

registerUserRouter.post("/", handleRegisterUser);

export default registerUserRouter;