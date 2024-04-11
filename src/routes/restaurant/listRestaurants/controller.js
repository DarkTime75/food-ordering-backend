/* eslint-disable no-unused-vars */
import { SchemaValidators } from "../../../frameworks/index.js";
import { Restaurant } from "../../../../db/models/index.js";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default async function listRestaurants(req, _) {
    const response = { hasError: true, title: "Error", data: null, message: "An error occured while listing restaurants" };

    try {
        const { pageNo, pageSize } = SchemaValidators.ListRestaurantsSchema.parse(req.body);
        const restaurants = await Restaurant.aggregate([
            {
                $facet: {
                    "groupQuery": [{ $group: { _id: null, count: { $sum: 1 } } }],
                    "dataList": [{ $skip: (pageNo - 1) * pageSize }, { $limit: pageSize }],
                },
            },
            {
                $unwind: "$groupQuery",
            },
            {
                $project: {
                    remainingCount: { $subtract: ["$groupQuery.count", pageSize] },
                    dataList: {
                        $map: {
                            input: "$dataList",
                            as: "restaurant",
                            in: {
                                _id: "$$restaurant._id",
                                name: "$$restaurant.name",
                                cusine: "$$restaurant.cuisine",
                                price: "$$restaurant.price",
                                rating: "$$restaurant.rating",
                                bannerURL: "$$restaurant.bannerURL",
                            },
                        },
                    },
                },
            },
        ]);


        response.hasError = false;
        response.title = "Restaurants List";
        response.message = "Restaurants listed successfully";
        response.data = restaurants[0];

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
}