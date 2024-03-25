import { Router } from "express";
import loginUser from "./controller.js";

const loginUserRouter = Router();

const handleLoginUser = async (req, res) => {
    const response = await loginUser(req, res);
    const status = response.hasError ? 422 : 200;
    res.status(status).send(response);
};

loginUserRouter.post("/", handleLoginUser);

export default loginUserRouter;
