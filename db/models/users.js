import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UsersSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    match: /^[a-zA-Z][a-zA-Z\\s]+$/,
  },
  middle_name: {
    type: String,
    match: /^[a-zA-Z][a-zA-Z\\s]+$/,
  },
  last_name: {
    type: String,
    match: /^[a-zA-Z][a-zA-Z\\s]+$/,
  },
  phone_no: {
    type: String,
    required: true,
    match: /^[789]\d{9}$/,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "the password must have more than or equal to 8 characters"],
  },
  // created_at: { type: Date, default: Date.now() },
  // updated_at: { type: Date, default: Date.now() },
}, { timestamps: true });

UsersSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});


UsersSchema.methods.comparePassword = async function (candidatePassword) {
  return new Promise((resolve, reject) => {
    const user = this;
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
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

export const User = model("User", UsersSchema);