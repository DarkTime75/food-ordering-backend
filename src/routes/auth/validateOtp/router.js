import { Router } from "express";
import validateOtp from "./controller.js";

const validateOtpRouter = Router();

const handleValidateOtp = async (req, res) => {
    try {
        const response = await validateOtp();
        res.status(200).send({ hasError: false, data: response });
    } catch (err) {
        console.log(err);
        res.status(422).send({ hasError: true, error: err });
    }
};

validateOtpRouter.post("/", handleValidateOtp);

export default validateOtpRouter;