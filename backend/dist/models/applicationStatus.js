import mongoose, { Schema } from "mongoose";
const applicationStatusSchema = new Schema({
    applicationId: { type: String, required: true, unique: true }, // Link to the primary applicant's application
    riskAssessment: { type: String, enum: ["pending", "completed"], default: "pending" },
    profileCompletion: { type: String, enum: ["pending", "completed"], default: "pending" },
    payment: { type: String, enum: ["pending", "completed"], default: "pending" },
    documentUpload: { type: String, enum: ["pending", "completed"], default: "pending" },
    assignedCaseManager: { type: Boolean, default: false },
    reviewSubmit: { type: Boolean, default: false },
    visaApplied: { type: Boolean, default: false },
    status: { type: String, default: 'N/A' },
    visaStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    caseManagerNotes: { type: String },
});
const ApplicationStatus = mongoose.model("ApplicationStatus", applicationStatusSchema);
export default ApplicationStatus;
