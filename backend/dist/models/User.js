import mongoose, { Schema } from "mongoose";
const roleEnum = ["USER", "SA", "COUNSELLOR"];
const userSchema = new Schema({
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
});
const User = mongoose.model("User", userSchema);
export default User;
