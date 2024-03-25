import { Router } from "express";
import logoutUser from "./controller.js";

const logoutUserRouter = Router();

const handleLogoutUser = async (req, res) => {
    const response = await logoutUser(req, res);
    const status = response.hasError ? 422 : 200;
    res.status(status).send(response);
};

logoutUserRouter.post("/", handleLogoutUser);

export default logoutUserRouter;
