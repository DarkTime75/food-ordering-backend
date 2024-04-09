import { Router } from "express";
import listRestaurants from "./controller.js";
import { StatusCodes } from "http-status-codes";

const listRestaurantsRouter = Router();

const handleListRestaurants = async (req, res) => {
    const response = await listRestaurants(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

listRestaurantsRouter.post("/", handleListRestaurants);

export default listRestaurantsRouter;