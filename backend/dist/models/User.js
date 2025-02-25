var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from "mongoose";
const roleEnum = ["USER", "SA", "CASE_MANAGER"];
const userSchema = new Schema({
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
    applicationId: { type: String, sparse: true },
    primaryApplicationId: { type: String },
    isPrimaryApplicant: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    googleId: { type: String },
    relationship: {
        type: String,
        enum: ["parent", "sibling", "spouse", "children"],
    },
});
userSchema.pre('deleteOne', { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = this;
            console.log('User to be deleted:', user);
            if (user.isPrimaryApplicant) {
                const appId = user.applicationId;
                console.log('Primary Applicant, appId:', appId);
                if (appId) {
                    const relatedUsers = yield mongoose.model('User').find({ primaryApplicationId: appId }).select('_id visaDataId');
                    console.log("relatedUsers", relatedUsers);
                    const relatedUserIds = relatedUsers.map((user) => user._id);
                    const relatedVisaDataIds = relatedUsers.map(user => user.visaDataId).filter(Boolean);
                    yield Promise.all([
                        mongoose.model('ApplicationStatus').deleteOne({ applicationId: appId }),
                        mongoose.model('VisaData').deleteMany({ _id: { $in: relatedVisaDataIds } }),
                        mongoose.model('Document').deleteMany({ userId: { $in: relatedUserIds } }),
                        mongoose.model('PersonalData').deleteMany({ userId: { $in: relatedUserIds } }),
                        mongoose.model('User').deleteMany({ primaryApplicationId: appId })
                    ]);
                    // unset primaryApplicationId from other users
                    yield mongoose.model('User').updateMany({ primaryApplicationId: appId }, { $unset: { primaryApplicationId: 1 } });
                }
            }
            else {
                console.log('Not Primary Applicant, deleting related data for current user only.');
                // If no applicationId or not primary, just delete the current user's related data
                if (user.visaDataId) {
                    yield mongoose.model('VisaData').deleteOne({ _id: user.visaDataId });
                }
                yield mongoose.model('Document').deleteMany({ userId: user._id });
                yield mongoose.model('PersonalData').deleteOne({ userId: user._id });
            }
            next();
        }
        catch (error) {
            console.error("Error during delete operation:", error);
            next(error);
        }
    });
});
// Add an index for faster queries
userSchema.index({ googleId: 1 }, { sparse: true });
const User = mongoose.model("User", userSchema);
export default User;
