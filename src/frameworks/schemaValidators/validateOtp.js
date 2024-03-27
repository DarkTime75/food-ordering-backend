import { z } from "zod";

export const ValidateOTPSchema = z.object({
    email: z.string({ invalid_type_error: "Email must be a string", required_error: "Email is required" })
        .email({ message: "Invalid email" }),
    otp: z.string({ invalid_type_error: "OTP must be a string", required_error: "OTP is required" })
        .min(6, { message: "OTP must be 6 characters long" })
        .max(6, { message: "OTP must be 6 characters long" })
        .regex(/^\d+$/, { message: "String must contain only digits" }),
})
.strict({ message: "Please input the following keys only: email, otp" });