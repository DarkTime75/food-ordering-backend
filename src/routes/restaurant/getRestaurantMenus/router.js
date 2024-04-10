import { Router } from "express";
import getRestaurantMenus from "./controller.js";
import { StatusCodes } from "http-status-codes";

const getRestaurantMenusRouter = Router();

const handleGetRestaurantMenus = async (req, res) => {
    const response = await getRestaurantMenus(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

getRestaurantMenusRouter.post("/", handleGetRestaurantMenus);

export default getRestaurantMenusRouter;