import { z } from "zod";

export const LoginUserSchema = z.object({
    phoneNo: z.string({ invalid_type_error: "Phone number must be a string" })
        .min(10, { message: "Phone number must be 10 digits" })
        .max(10, { message: "Phone number must be 10 digits" })
        .optional(),
    email: z.string({ invalid_type_error: "Email must be a string" })
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email" })
        .optional(),
    password: z.string({ invalid_type_error: "Password must be a string", required_error: "Password is required" })
        .min(8, { message: "Password must be atleast 8 characters long" }),
})
.strict({ message: "Please input the following keys only: phoneNo, email, password" });