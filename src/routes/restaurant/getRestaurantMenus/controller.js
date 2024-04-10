import { Restaurant } from "../../../../db/models/index.js";
import { SchemaValidators } from "../../../frameworks/index.js";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// eslint-disable-next-line no-unused-vars
const getRestaurantMenus = async (req, res) => {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while sending password reset link" };

    try {
        const { restaurantId } = SchemaValidators.GetRestaurantMenusSchema.parse(req.body);

        const restaurantMenus = await Restaurant.findOne({ _id: restaurantId }, { menuItems: 1 });
        if (!restaurantMenus?._id) {
            response.message = "Restaurant not found";
            return response;
        }

        response.hasError = false;
        response.title = "Restaurant Menus";
        response.message = "Restaurant menus fetched successfully";
        response.data = restaurantMenus.menuItems;

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

export default getRestaurantMenus;