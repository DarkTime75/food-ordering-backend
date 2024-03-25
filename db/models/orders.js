import mongoose, { SchemaTypes } from 'mongoose';
const { Schema } = mongoose;

const ordersSchema = new Schema({
    user_id: { type: SchemaTypes.ObjectId, ref: "User" },
    // address_id: String,
    delivery_charge: Number,
    total_cost: Number,
}, { timestamps: true });

export const Order = mongoose.model('Order', ordersSchema);