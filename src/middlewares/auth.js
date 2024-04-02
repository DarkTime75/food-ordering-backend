import jwt from "jsonwebtoken";
import { User } from "../../db/models/index.js";

export const requireAuth = async (req, res, next) => {
    const token = req.cookies.access_token;
    const response = { hasError: true, message: "You must be logged in", data: null };

    if (!token) {
        return res.status(401).json(response);
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (!data?.userId) {
            response.message = "Invalid token";
            return res.status(401).json(response);
        }

        const userInfo = await User.findById(data.userId);

        if (!userInfo) {
            response.message = "Invalid User";
            return res.status(401).json(response);
        }

        req.userId = userInfo._id;
        return next();
    } catch (e) {
        console.error(e);
        response.message = "Invalid Token";
        return res.status(401).json(response);
    }
};
