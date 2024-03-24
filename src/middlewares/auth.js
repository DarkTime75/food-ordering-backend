import jwt from "jsonwebtoken";
import { User } from "../../db/models/index.js";

export const requireAuth = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).send({ error: "You must be logged in" });
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            if (!data?.userId) {
                res.status(401).send({ error: "You must be logged in" });
            } else {
                const userInfo = await User.findById(data.userId);
                if (!userInfo?._id) {
                    res.status(401).send({ error: "Invalid User" });
                } else {
                    req.userId = userInfo._id;
                    next();
                }
            }
        } catch (e) {
            console.error(e);
            res.status(401).send({ error: "An error occurred" });
        }
    }
};
