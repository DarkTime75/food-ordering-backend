import { Router } from "express";
import registerUser from "./controller.js";
import { logger } from "#src/util/logger.js";

const registerUserRouter = Router();

const handleRegisterUser = async (req, res) => {
    const { item } = req.body;

    if (!item) {
        res.status(404).send({ data: "Didn't provide item" });
        return;
    }

    try {
        const response = registerUser(item);
        res.status(200).send({ data: response });
    } catch (err) {
        console.log(err)
        res.status(422).send({ error: err });
    }
};

registerUserRouter.post("/", handleRegisterUser);
export default registerUserRouter;