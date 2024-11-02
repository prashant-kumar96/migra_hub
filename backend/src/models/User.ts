import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  profile_pic: {};
  contact: String;
}
const roleEnum = ["USER", "SA", "COUNSELLOR"];
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^[\w]+[@]{1}[\w]+([.][\w]{2,})+$/g,
      "Please use a valid email Address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Please use a valid Password",
    ],
  },
  role: {
    type: String,
    enum: roleEnum,
    default: "USER",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profile_pic: { type: {} },
  contact: { type: String },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
