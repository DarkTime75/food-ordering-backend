import { z } from "zod";

export const ResetPasswordSchema = z.object({
    token: z.string({ invalid_type_error: "Token must be a string", required_error: "Token is required" }),
    userId: z.string({ invalid_type_error: "User ID must be a string", required_error: "User ID is required" }),
    password: z.string({ invalid_type_error: "Password must be a string", required_error: "Password is required" })
        .min(8, { message: "Password must be atleast 8 characters long" }),
    confirmPassword: z.string({ invalid_type_error: "Confirm password must be a string", required_error: "Confirm password is required" })
        .min(8, { message: "Confirm password must be atleast 8 characters long" }),
})
.strict({ message: "Please input the following keys only: token, userId, password, confirmPassword" })
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});