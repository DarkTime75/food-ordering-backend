import { z } from "zod";
import { EmailSchema } from "./common/email.js";

export const ValidateOTPSchema = EmailSchema.extend({
    otp: z.string({ invalid_type_error: "OTP must be a string", required_error: "OTP is required" })
        .min(6, { message: "OTP must be 6 characters long" })
        .max(6, { message: "OTP must be 6 characters long" })
        .regex(/^\d+$/, { message: "String must contain only digits" }),
})
.strict({ message: "Please input the following keys only: email, otp" });