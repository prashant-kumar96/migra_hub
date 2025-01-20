import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Make password optional, as it might not be present for google login
  role: string;
  createdAt: Date;
  updatedAt: Date;
  payment: boolean;
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
    
  applicationId: { type: String, sparse: true}, // Application ID field - unique is removed

  primaryApplicationId: { type: String }, // Primary Application ID field
  isPrimaryApplicant: { type: Boolean, default: false },
  payment: {type:Boolean, default:false},
  googleId:{type: String},
  relationship: { type: String, enum: ["parent", "sibling", "spouse", "children"] }, // Relationship field
});

//@ts-ignore
userSchema.pre('remove', async function(next) {
    try {
        const appId = this.applicationId;
        
        if (appId) {
            // Find all users with this applicationId first
            const relatedUsers = await mongoose.model('User').find({ primaryApplicationId: appId });
            
            // Delete ApplicationStatus for this applicationId
            await mongoose.model('ApplicationStatus').deleteOne({ applicationId: appId });
  
            // Delete all related data for each user with the same applicationId
            for (const user of relatedUsers) {
                // Delete VisaData
                if (user.visaDataId) {
                    await mongoose.model('VisaData').deleteOne({ _id: user.visaDataId });
                }
                
                // Delete UserDocument (note the model name is "Document" but collection name might be different)
                await mongoose.model('Document').deleteMany({ userId: user._id });
                
                // Delete PersonalData
                await mongoose.model('PersonalData').deleteOne({ userId: user._id });
                
                // Delete the user if it's not the current user being deleted
                if (user._id.toString() !== this._id.toString()) {
                    await mongoose.model('User').deleteOne({ _id: user._id });
                }
            }
        } else {
            // If no applicationId, just delete the current user's related data
            if (this.visaDataId) {
                await mongoose.model('VisaData').deleteOne({ _id: this.visaDataId });
            }
            await mongoose.model('Document').deleteMany({ userId: this._id });
            await mongoose.model('PersonalData').deleteOne({ userId: this._id });
        }
        
        // Clean up any references in other users
         await mongoose.model('User').updateMany(
            { primaryApplicationId: this.applicationId },
            { $unset: { primaryApplicationId: 1 } }
        );

        next();
    } catch (error) {
        next(error as Error);
    }
});

// Add an index for faster queries
// userSchema.index({ email: 1 });
// userSchema.index({ applicationId: 1 }, { sparse: true });
userSchema.index({ googleId: 1 }, { sparse: true });

const User = mongoose.model<IUser>("User", userSchema);
export default User;