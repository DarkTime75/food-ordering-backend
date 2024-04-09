import { z } from "zod";

export const ListRestaurantsSchema = z.object({
    pageNo: z.number({ required_error: "Page number is required", invalid_type_error: "Page number must be a number" }),
    pageSize: z.number({ required_error: "Page size is required", invalid_type_error: "Page size must be a number" }),
})
.strict({ message: "Please input the following keys only: pageNo, pageSize" });