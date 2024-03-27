import { z } from "zod";

export const SendOTPSchema = z.object({
    email: z.string({ invalid_type_error: "Email must be a string", required_error: "Email is required" })
        .email({ message: "Invalid email" }),
})
.strict({ message: "Please input the following keys only: email" });