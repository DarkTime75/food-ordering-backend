import { Router } from "express";
import registerUser from "./controller.js";

const registerUserRouter = Router();

const handleRegisterUser = async (req, res) => {
    const response = await registerUser(req, res);
    const status = response.hasError ? 422 : 200;
    res.status(status).send(response);
};

registerUserRouter.post("/", handleRegisterUser);

export default registerUserRouter;