import { Token, User } from "../../../../db/models/index.js";
import { SchemaValidators, Mail } from "../../../frameworks/index.js";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { randomBytes } from "node:crypto";

// eslint-disable-next-line no-unused-vars
const requestPasswordReset = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while sending password reset link" };

    try {
        const { email } = SchemaValidators
            .EmailSchema
            .strict({ message: "Please input the following keys only: email" })
            .parse(req.body);

            const userInfo = await User.findOne({ email });

            if (!userInfo) {
                response.message = "User not found";
                return response;
            }

            const token = await Token.findOne({ userId: userInfo._id });

            if (token) {
                await token.deleteOne();
            }

            const resetToken = randomBytes(32).toString("hex");

            await new Token({
              userId: userInfo._id,
              token: resetToken,
            }).save();

            const passwordResetLink = `http://localhost:${process.env.PORT}/password/reset?token=${resetToken}&id=${userInfo._id}`;

            const isMailSent = await Mail.sendPasswordResetLink(email, passwordResetLink);
            if (isMailSent) {
                response.hasError = false;
                response.title = "Password Reset Link";
                response.message = "Password reset link sent successfully";
                return response;
            }

            response.message = "An error occured while sending password reset link";
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

export default requestPasswordReset;