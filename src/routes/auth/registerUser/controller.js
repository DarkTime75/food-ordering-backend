import { User } from "../../../../db/models/index.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while signing up" };

    try {
        const { phoneNo, firstName, middleName, lastName, email, password } = req.body;
        if (!email || !password || !phoneNo || !firstName) {
            response.message = "Email, password, phone number and first name are required";
            return response;
        }

        if (password.length < 8) {
            response.message = "Password must be atleast 8 characters long";
            return response;
        }

        if (phoneNo.length !== 10) {
            response.message = "Phone number must be 10 digits long";
            return response;
        }

        const existingUserInfo = await User.findOne({ $or: [{ email }, { phone_no: phoneNo }] });
        if (existingUserInfo?._id) {
            response.message = "Email or phone number already exists";
            return response;
        }

        const user = await User.create({
            email,
            phone_no: phoneNo,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            password,
        });

        const userInfo = await user.save();

        if (!userInfo?._id) {
            return response;
        }

        const token = jwt.sign({ userId: userInfo._id }, process.env.JWT_SECRET);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        response.hasError = false;
        response.title = "Sign Up Success";
        response.message = "Sign up successfully";
        response.data = { token };
        return response;
    } catch (err) {
        console.log(err);
        return response;
    }
};

export default registerUser;
