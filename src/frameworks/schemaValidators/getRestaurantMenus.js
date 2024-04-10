import { z } from "zod";

export const GetRestaurantMenusSchema = z.object({
    restaurantId: z.string({ required_error: "Restaurant ID is required", invalid_type_error: "Restaurant ID must be a string" }),
})
.strict({ message: "Please input the following keys only: restaurantId" });