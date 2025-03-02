import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  correctAnswers: {
    type: Number,
    default: 0,
  },
  incorrectAnswers: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = model("User", UserSchema)

// Add named exports for database operations
export const findById = async (id) => {
  return await User.findById(id);
}

export const findOne = async (query) => {
  return await User.findOne(query);
}

export default User