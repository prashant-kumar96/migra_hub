import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IApplicationStatus extends Document {
    userId: ObjectId;
    riskAssessment: string; // "pending", "completed"
    profileCompletion: string; // "pending", "completed"
    payment: string; // "pending", "completed"
    documentUpload: string; // "pending", "completed"
    createdAt: Date;
    updatedAt: Date;
    applicationId: string // added application id
}


const applicationStatusSchema: Schema<IApplicationStatus> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    riskAssessment: { type: String, enum: ["pending", "completed"], default: "pending" },
    profileCompletion: { type: String, enum: ["pending", "completed"], default: "pending" },
    payment: { type: String, enum: ["pending", "completed"], default: "pending" },
    documentUpload: { type: String, enum: ["pending", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
     applicationId: { type: String, unique: true },
});


const ApplicationStatus = mongoose.model<IApplicationStatus>("ApplicationStatus", applicationStatusSchema);

export default ApplicationStatus