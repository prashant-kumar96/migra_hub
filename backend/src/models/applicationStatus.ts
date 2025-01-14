import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IApplicationStatus extends Document {
    applicationId: string; // Link to the primary applicant's application
    riskAssessment: string; // "pending", "completed"
    profileCompletion: string; // "pending", "completed"
    payment: string; // "pending", "completed"
    documentUpload: string; // "pending", "completed"
    assignedCaseManager: boolean; // true if a case manager is assigned
    reviewSubmit: boolean;
    visaApplied: boolean; // true if the visa application has been submitted
    visaStatus: string; // "pending", "approved", "rejected"
    createdAt: Date;
    status:String;
    updatedAt: Date;
    caseManagerNotes?: string; // Case manager notes
}

const applicationStatusSchema: Schema<IApplicationStatus> = new Schema({
    applicationId: { type: String, required: true, unique: true }, // Link to the primary applicant's application
    riskAssessment: { type: String, enum: ["pending", "completed"], default: "pending" },
    profileCompletion: { type: String, enum: ["pending", "completed"], default: "pending" },
    payment: { type: String, enum: ["pending", "completed"], default: "pending" },
    documentUpload: { type: String, enum: ["pending", "completed"], default: "pending" },
    assignedCaseManager: { type: Boolean, default: false },
    reviewSubmit: { type: Boolean, default: false },
    visaApplied: { type: Boolean, default: false },
    status :     { type:String, default:'N/A' },
    visaStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    caseManagerNotes: { type: String },
});

const ApplicationStatus = mongoose.model<IApplicationStatus>("ApplicationStatus", applicationStatusSchema);

export default ApplicationStatus;