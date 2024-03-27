import { Schema, SchemaTypes, model } from "mongoose";

const OrderItemsSchema = new Schema({
    order_id: { type: SchemaTypes.ObjectId, ref: "Order" },
    order_item: String,
    quantity: Number,
}, { timestamps: true });

export const Order = model("OrderItems", OrderItemsSchema);
