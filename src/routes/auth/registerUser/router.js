import { Router } from "express";
import registerUser from "./controller.js";

const registerUserRouter = Router();

const handleRegisterUser = async (req, res) => {
    try {
        const response = await registerUser(item);
        res.status(200).send({ hasError: false, data: response });
    } catch (err) {
        console.log(err)
        res.status(422).send({ hasError: true, error: err });
    }
};

registerUserRouter.post("/", handleRegisterUser);

export default registerUserRouter;