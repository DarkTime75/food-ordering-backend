import { User } from "../../../../db/models/index.js";
import jwt from "jsonwebtoken";
import { SchemaValidators } from "../../../frameworks/index.js";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";


const loginUser = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while logging in" };

    try {
        const { email, phoneNo, password } = SchemaValidators.LoginUserSchema.parse(req.body);

        if (!email && !phoneNo) {
            response.message = "Either Email or Phone number is required";
            return response;
        }

        const whereCondition = email ? { email } : { phone_no: phoneNo };

        const userInfo = await User.findOne(whereCondition);

        if (!userInfo?._id) {
            response.message = "Invalid User";
            return response;
        }

        const isValidPassword = await userInfo.comparePassword(password).catch(() => false);
        if (!isValidPassword) {
            response.message = "Invalid password";
            return response;
        }

        const token = jwt.sign({ userId: userInfo._id }, process.env.JWT_SECRET);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        response.hasError = false;
        response.title = "Login Success";
        response.message = "Logged in successfully";
        response.data = { token };
        return response;
    } catch (err) {
        if (err instanceof ZodError) {
            const formattedError = fromZodError(err);
            console.error(formattedError);
            response.message = formattedError.details[0].message;
        } else {
            console.error(err);
        }
        return response;
    }
};

export default loginUser;
