import { User } from "../../../../db/models/index.js";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { RegisterUserSchema } from "../../../frameworks/schemaValidators/index.js";

const registerUser = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while signing up" };

    try {
        const { email, phoneNo, firstName, middleName, lastName, password } = RegisterUserSchema.parse(req.body);

        const existingUserInfo = await User.findOne({ $or: [{ email }, { phone_no: phoneNo }] });
        if (existingUserInfo?._id) {
            response.message = "Email or phone number already exists";
            return response;
        }

        const user = await User.create({
            email,
            phone_no: phoneNo,
            first_name: firstName,
            password,
            ...(middleName && { middle_name: middleName }),
            ...(lastName && { last_name: lastName }),
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
        response.message = "Signed up successfully";
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

export default registerUser;
