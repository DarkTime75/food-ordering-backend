import { OTP, User } from "../../../../db/models/index.js";
import { SchemaValidators, Utils, Mail } from "../../../frameworks/index.js";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// eslint-disable-next-line no-unused-vars
const sendOtp = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while sending OTP" };

    try {
        const { email } = SchemaValidators
          .EmailSchema
          .strict({ message: "Please input the following keys only: email" })
          .parse(req.body);

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
          response.message = "User already exists";
          return response;
        }

        let otp = Utils.generateOTP();

        let result = await OTP.findOne({ otp });

        while (result) { // This is to handle duplicate OTPs
          otp = Utils.generateOTP();
          result = await OTP.findOne({ otp });
        }

        const otpPayload = { email, otp };

        await OTP.create(otpPayload);

        const isOtpSent = await Mail.sendOTPEmail(email, otp);
        if (!isOtpSent) {
          response.message = "An error occured while sending OTP";
          return response;
        }

        response.hasError = false;
        response.title = "OTP Sent";
        response.message = "OTP Sent successfully";
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

export default sendOtp;