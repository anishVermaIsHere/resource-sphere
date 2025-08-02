import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema(
  {
    uid: { type: String, unique: true, default: uuidv4() },
    firstName: { type: String, required: [true, "Please provide first name"] },
    lastName: { type: String, required: [true, "Please provide last name"] },
    fullName: { type: String },
    userName: { type: String, required: [true, "Please provide username"] },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male"
    },
    email: { type: String, required: [true, "Please provide email"] },
    password: { type: String, required: [true, "Please provide password"] },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("Users", userSchema);

export default UserModel;
