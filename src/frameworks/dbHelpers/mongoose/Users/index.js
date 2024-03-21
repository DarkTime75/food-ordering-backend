import { models } from "mongoose";

export async function getUserById(id) {
   return models.User.findById(id);
}

export async function getUserByMobNo(mobNo) {
    return models.User.findOne({ phone_no: mobNo });
}

export async function createUser(data) {
    return models.User.create(data);
}

export async function updateUserById(id, dataToUpdate) {
    return models.User.findByIdAndUpdate(id, dataToUpdate, { new: true });
}