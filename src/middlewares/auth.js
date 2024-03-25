import jwt from "jsonwebtoken";
import { User } from "../../db/models/index.js";

export const requireAuth = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (!data?.userId) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        const userInfo = await User.findById(data.userId);

        if (!userInfo?._id) {
            return res.status(401).json({ error: "Invalid User" });
        }

        req.userId = userInfo._id;
        return next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({ error: "An error occurred" });
    }
};
