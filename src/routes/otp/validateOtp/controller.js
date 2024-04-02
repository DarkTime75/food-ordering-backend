import { OTP } from "../../../../db/models/index.js";
import { SchemaValidators } from "../../../frameworks/index.js";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// eslint-disable-next-line no-unused-vars
const validateOtp = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while validating OTP" };

    try {
        const { email, otp } = SchemaValidators.ValidateOTPSchema.parse(req.body);

        const otpResult = await OTP.findOne({ email });

        if (!otpResult?._id) {
            response.message = "No OTP found for this email";
            return response;
        }

        if (otp !== otpResult.otp) {
            response.message = "Invalid OTP";
            return response;
        }

        response.hasError = false;
        response.title = "OTP Validation Success";
        response.message = "OTP validated successfully";
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

export default validateOtp;