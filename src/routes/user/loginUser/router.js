import { Router } from "express";
import loginUser from "./controller.js";
import { StatusCodes } from "http-status-codes";

const loginUserRouter = Router();

const handleLoginUser = async (req, res) => {
    const response = await loginUser(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

loginUserRouter.post("/", handleLoginUser);

export default loginUserRouter;
