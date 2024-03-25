import mongoose, { ObjectId } from 'mongoose';
const { Schema } = mongoose;

const ordersSchema = new Schema({
    id: { type: ObjectId, ref: 'User' },
    user_id: { type: String, match: /^[A-Za-z0-9\s]+$/ },
    address_id: { type: String, match: /^[A-Za-z0-9\s]+$/ },
    delivery_charge: Number,
    total_cost: Number
});

export const Order = mongoose.model('Order', ordersSchema);