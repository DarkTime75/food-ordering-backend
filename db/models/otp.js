import { Schema, model } from "mongoose";

const OtpSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 60 * 5, // 5 minutes expiry time
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
});

export const OTP = model("OTP", OtpSchema);