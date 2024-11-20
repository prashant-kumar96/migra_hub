import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  profile_pic: {};
  contact: String;
  visaDataId: ObjectId;
  stripePaymentSessionId: String;
  isStripePaymentDone: Boolean;
  assignedCaseManagerId: ObjectId;
}
const roleEnum = ["USER", "SA", "CASE_MANAGER"];
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
  visaDataId: { type: Schema.Types.ObjectId, ref: "VisaData" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  profile_pic: { type: {} },
  contact: { type: String },
  stripePaymentSessionId: { type: String },
  isStripePaymentDone: { type: Boolean },
  assignedCaseManagerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
