import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const TokenSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 60 * 60, // 1 hour
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

TokenSchema.pre("save", function (next) {
  if (!this.isModified("token")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(this.token, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.token = hash;
      next();
    });
  });
});

TokenSchema.methods.compareToken = async function (candidateToken) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidateToken, this.token, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

export const Token = model("token", TokenSchema);