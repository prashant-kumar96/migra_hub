import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Make password optional, as it might not be present for google login
  role: string;
  createdAt: Date;
  updatedAt: Date;
  profile_pic?: {};
  contact?: String;
  visaDataId: ObjectId;
  stripePaymentSessionId?: String;
  isStripePaymentDone?: Boolean;
  assignedCaseManagerId?: ObjectId;
  applicationId?: string; // Add application ID
    primaryApplicationId?: string; // Add primary application ID
  isPrimaryApplicant?: boolean;
  googleId?: string; // Add Google ID for Google login
    relationship?: "father" | "mother" | "brother" | "sister"; // Add the relationship field
}
const roleEnum = ["USER", "SA", "CASE_MANAGER"];
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: [false, "Name is required"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email Address",
    ],
  },
  password: {
    type: String,
    required: [false, "Password is required"],
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
  applicationId: { type: String, unique: true }, // Application ID field
  primaryApplicationId: { type: String }, // Primary Application ID field
  isPrimaryApplicant: { type: Boolean, default: false },
  googleId:{type: String},
  relationship: { type: String, enum: ["father", "mother", "brother", "sister"] }, // Relationship field
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;