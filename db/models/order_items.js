import mongoose, { SchemaTypes } from "mongoose";
const { Schema } = mongoose;

const order_itemsSchema = new Schema({
    order_id: { type: SchemaTypes.ObjectId, ref: "Order" },
    order_item: String,
    quantity: Number,
}, { timestamps: true });

export const Order = mongoose.model("OrderItems", order_itemsSchema);