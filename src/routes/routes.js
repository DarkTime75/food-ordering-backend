import { Router } from "express";
import { registerUser } from "../controllers/index";

const router = Router()

router.route("/home").post(registerUser)
