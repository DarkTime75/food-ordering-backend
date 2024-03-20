import mongoose, { ObjectId } from 'mongoose';
const { Schema } = mongoose;

const usersSchema = new Schema({
    id: ObjectId,
    first_name: { type: String, required: true, match: /^[a-zA-Z][a-zA-Z\\s]+$/ },
    middle_name: { type: String, match: /^[a-zA-Z][a-zA-Z\\s]+$/ },
    last_name: { type: String, match: /^[a-zA-Z][a-zA-Z\\s]+$/ },
    phone_no: { type: String, required: true, match: /^[789]\d{9}$/ },
    email: { type: String, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    password: { type: String, required: true, minlength: [8, 'the password must have more or equal than 8 characters'], match: /^[A-Za-z0-9\s]+$/ },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
});

export const User = mongoose.model('User', usersSchema);

