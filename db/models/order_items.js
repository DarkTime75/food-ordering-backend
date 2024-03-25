import mongoose, { ObjectId } from 'mongoose';
const { Schema } = mongoose;

const order_itemsSchema = new Schema({
    id: { type: ObjectId, ref: 'User' },
    order_id: { type: String, match: /^[A-Za-z0-9\s]+$/ },
    order_item: { type: String, match: /^[A-Za-z0-9\s]+$/ },
    quantity: Number
});

export const Order = mongoose.model('OrderItems', order_itemsSchema);