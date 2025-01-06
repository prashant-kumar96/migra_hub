import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IApplicationStatus extends Document {
    userId: ObjectId;
    riskAssessment: string; // "pending", "completed"
    profileCompletion: string; // "pending", "completed"
    payment: string; // "pending", "completed"
    documentUpload: string; // "pending", "completed"
    assignedCaseManager: boolean; // true if a case manager is assigned
    visaApplied: boolean; // true if the visa application has been submitted
    visaApproved: string; // "pending", "approved", "rejected"
    createdAt: Date;
    updatedAt: Date;
    applicationId: string; // added application id
    caseManagerNotes?: string; // Case manager notes
}

const applicationStatusSchema: Schema<IApplicationStatus> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    riskAssessment: { type: String, enum: ["pending", "completed"], default: "pending" },
    profileCompletion: { type: String, enum: ["pending", "completed"], default: "pending" },
    payment: { type: String, enum: ["pending", "completed"], default: "pending" },
    documentUpload: { type: String, enum: ["pending", "completed"], default: "pending" },
    assignedCaseManager: { type: Boolean, default: false },
    visaApplied: { type: Boolean, default: false },
    visaApproved: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    applicationId: { type: String, unique: true },
    caseManagerNotes: { type: String },
});

const ApplicationStatus = mongoose.model<IApplicationStatus>("ApplicationStatus", applicationStatusSchema);

export default ApplicationStatus;