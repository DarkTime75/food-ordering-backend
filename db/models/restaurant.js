import { Schema, model } from "mongoose";

const RestaurantItemsSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  });

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    cuisine: {
        type: String,
        required: true,
        enum: ["American", "Italian", "Chinese", "Mexican", "Japanese", "French", "Indian", "Thai", "Vietnamese", "Greek"],
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    bannerURL: {
        type: String,
        required: true,
    },
    menuItems: [RestaurantItemsSchema],
});

export const Restaurant = model("Restaurant", RestaurantSchema);