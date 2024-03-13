import { Router } from "express";
import loginUser from "./controller.js";

const loginUserRouter = Router();

const handleLoginUser = async (req, res) => {
    try {
        const response = await loginUser(item);
        res.status(200).send({ hasError: false, data: response });
    } catch (err) {
        console.log(err)
        res.status(422).send({ hasError: true, error: err });
    }
};

loginUserRouter.post("/", handleLoginUser);

export default loginUserRouter;
