import { Router } from "express";
import logoutUser from "./controller.js";
import { StatusCodes } from "http-status-codes";

const logoutUserRouter = Router();

const handleLogoutUser = async (req, res) => {
    const response = await logoutUser(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

logoutUserRouter.post("/", handleLogoutUser);

export default logoutUserRouter;
