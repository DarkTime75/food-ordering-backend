import { User } from "../../../../db/models/index.js";
import jwt from "jsonwebtoken";
import * as constants from "../../../constants/index.js";


const loginUser = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while logging in" };

    try {
        const { phoneNo, email, password } = req.body;
        if (!email && !phoneNo) {
            response.message = "Either Email or phone number is required";
            return response;
        }

        if (!password) {
            response.message = "Password is required";
            return response;
        }

        if (!email.match(constants.regex.EMAIL_REGEX)) {
            response.message = "Invalid email address";
            return response;
        }

        if (password.length < 8) {
            response.message = "Password must be atleast 8 characters long";
            return response;
        }

        if (phoneNo && phoneNo.length !== 10) {
            response.message = "Phone number must be 10 digits long";
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
        console.error(err);
        return response;
    }
};

export default loginUser;
