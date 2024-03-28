import { Token, User } from "../../../../db/models/index.js";
import { SchemaValidators } from "../../../frameworks/index.js";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { genSalt, hash } from "bcrypt";

// eslint-disable-next-line no-unused-vars
const resetPassword = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while sending password reset link" };

    try {
        const { token, userId, password } = SchemaValidators.ResetPasswordSchema.parse(req.body);

        const tokenInfo = await Token.findOne({ userId });
        if (!tokenInfo) {
            response.message = "Expired password reset token";
            return response;
        }

        const isTokenValid = await tokenInfo.compareToken(token).catch(() => false);
        if (!isTokenValid) {
            response.message = "Invalid password reset token";
            return response;
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { password: hashedPassword } },
            { new: true },
        );

        await tokenInfo.deleteOne();

        response.hasError = false;
        response.title = "Password Reset";
        response.message = "Password reset successfully";
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

export default resetPassword;