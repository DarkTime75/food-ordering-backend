import { z } from "zod";
import { EmailSchema } from "./common/email.js";

export const RegisterUserSchema = EmailSchema.extend({
    phoneNo: z.string({ invalid_type_error: "Phone number must be a string", required_error: "Phone number is required" })
        .min(10, { message: "Phone number must be 10 digits" })
        .max(10, { message: "Phone number must be 10 digits" }),
    firstName: z.string({ invalid_type_error: "First name must be a string", required_error: "First name is required" })
        .min(1, { message: "First name must be atleast 1 character long" }),
    middleName: z.string({ invalid_type_error: "Middle name must be a string" })
        .min(1, { message: "Middle name must be atleast 1 character long" })
        .optional(),
    lastName: z.string({ invalid_type_error: "Last name must be a string" })
        .min(1, { message: "Last name must be atleast 1 character long" })
        .optional(),
    password: z.string({ invalid_type_error: "Password must be a string", required_error: "Password is required" })
        .min(8, { message: "Password must be atleast 8 characters long" }),
})
.strict({ message: "Please input the following keys only: phoneNo, firstName, middleName, lastName, email, password" });