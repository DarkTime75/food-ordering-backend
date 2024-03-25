import { Schema, SchemaTypes, model } from "mongoose";

const OrdersSchema = new Schema({
    user_id: { type: SchemaTypes.ObjectId, ref: "User" },
    // address_id: String,
    delivery_charge: Number,
    total_cost: Number,
}, { timestamps: true });

export const Order = model("Order", OrdersSchema);