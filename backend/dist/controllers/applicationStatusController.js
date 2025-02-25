// application.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ApplicationStatus from "../models/applicationStatus.js";
import PersonalData from "../models/personalData.js";
import User from "../models/User.js";
import UserDocument from "../models/userDocument.js";
import VisaData from "../models/visadata.js";
import sendEmail from '../utils/sender.js';
export const getApplicationStatusDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationId } = req.params;
        console.log("applicationId::", applicationId);
        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }
        const applicationStatus = yield ApplicationStatus.findOne({ applicationId: applicationId });
        if (!applicationStatus) {
            return res.status(404).json({ message: "Application status not found" });
        }
        const user = yield User.findOne({ applicationId }).populate('visaDataId');
        let personalData = null;
        let destinationCountry = null;
        if (user) {
            personalData = yield PersonalData.findOne({ userId: user._id });
            if (user.visaDataId) {
                const visaData = yield VisaData.findById(user.visaDataId);
                destinationCountry = visaData === null || visaData === void 0 ? void 0 : visaData.destinationCountry;
            }
        }
        const response = {
            message: "Application status details fetched successfully",
            applicationStatus: applicationStatus,
            name: personalData === null || personalData === void 0 ? void 0 : personalData.first_name,
            passport_number: personalData === null || personalData === void 0 ? void 0 : personalData.passport_number,
            citizenshipCountry: personalData === null || personalData === void 0 ? void 0 : personalData.citizenshipCountry,
            destinationCountry: destinationCountry
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error fetching application status details:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
export const updateDocumentUploadStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationId } = req.params;
        if (!applicationId) {
            return res.status(400).json({ message: "Application  ID is required" });
        }
        const applicationStatus = yield ApplicationStatus.findOne({ applicationId: applicationId });
        if (!applicationStatus) {
            return res.status(404).json({ message: "Application status not found" });
        }
        // Update the documentUpload field
        applicationStatus.documentUpload = 'completed';
        // Save the updated document
        yield applicationStatus.save();
        res.status(200).json({
            message: "Document upload status updated to completed successfully",
            updatedApplicationStatus: applicationStatus,
        });
    }
    catch (error) {
        console.error("Error updating document upload status:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
export const sendStatusUpdateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, status, applicationId } = req.body;
        if (!userId || !status) {
            return res
                .status(400)
                .json({ message: "User ID and status are required" });
        }
        const user = yield User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let updateData = { $set: { status: status } };
        if (applicationId) {
            const applicationStatus = yield ApplicationStatus.findOne({ applicationId: applicationId });
            if (applicationStatus) {
                try {
                    yield ApplicationStatus.updateOne({ _id: applicationStatus._id }, updateData);
                    console.log("Application status updated successfully");
                }
                catch (updateError) {
                    console.error("Error updating application status:", updateError);
                    return res
                        .status(500)
                        .json({ message: "Error updating application status", error: updateError });
                }
            }
            else {
                try {
                    yield ApplicationStatus.create({
                        applicationId: applicationId,
                        status: status,
                    });
                    console.log("Application status created successfully");
                }
                catch (createError) {
                    console.error("Error creating application status:", createError);
                    return res
                        .status(500)
                        .json({ message: "Error creating application status", error: createError });
                }
            }
        }
        const emailBody = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: `Application Status Update`,
            html: `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                 <h2 style="color: #333; margin-bottom: 20px;">Visa Application Status Update</h2>
                 <p style="color: #555; font-size: 16px;">Dear ${user.name},</p>
                 <p style="color: #555; font-size: 16px; margin-bottom: 20px;">
                   Your Visa application is now under <strong style="font-size: 18px;">${status}</strong>.
                </p>
                <p style="color: #555; font-size: 16px; margin-bottom: 20px;">
                     Thank you for using our service.
                 </p>
                 <div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center; color:#777">
                   Migra Hub
                 </div>
             </div>
             `,
        };
        yield sendEmail(emailBody, res, "Status email sent successfully");
    }
    catch (error) {
        console.error("Error sending status update email:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
export const getAllApplicationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationId } = req.params;
        console.log("getAllApplicationDetails::", applicationId);
        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }
        // Fetch primary applicant details
        const primaryApplicant = yield User.findOne({ applicationId: applicationId })
            .populate('visaDataId')
            .lean();
        if (!primaryApplicant) {
            return res.status(404).json({ message: "Primary applicant not found" });
        }
        // Fetch linked family members
        const familyMembers = yield User.find({ primaryApplicationId: applicationId, _id: { $ne: primaryApplicant._id } })
            .populate('visaDataId')
            .lean();
        // Fetch application status
        const applicationStatus = yield ApplicationStatus.findOne({ applicationId: applicationId })
            .lean();
        const allMembers = [primaryApplicant, ...familyMembers];
        const personalDataPromises = allMembers.map((member) => __awaiter(void 0, void 0, void 0, function* () {
            const personalData = yield PersonalData.findOne({ userId: member._id }).lean();
            return Object.assign(Object.assign({}, member), { personalData: personalData || null });
        }));
        const personalDataResults = yield Promise.all(personalDataPromises);
        const documentPromises = allMembers.map((member) => __awaiter(void 0, void 0, void 0, function* () {
            const documents = yield UserDocument.findOne({ userId: member._id }).lean();
            return Object.assign(Object.assign({}, member), { documents: documents || null });
        }));
        const documentResults = yield Promise.all(documentPromises);
        const formattedMembers = personalDataResults.map(member => {
            var _a;
            return Object.assign(Object.assign({}, member), { documents: ((_a = documentResults.find(doc => doc._id === member._id)) === null || _a === void 0 ? void 0 : _a.documents) || null });
        });
        const allApplications = formattedMembers.map(member => ({
            name: member.name,
            email: member.email,
            relationship: member.relationship,
            visaData: member.visaDataId,
            personalData: member.personalData,
            documents: member.documents,
            isPrimaryApplicant: member.isPrimaryApplicant,
            applicationStatus: applicationStatus
        }));
        res.status(200).json({
            message: "All application details fetched successfully",
            applications: allApplications
        });
    }
    catch (error) {
        console.error("Error fetching application details:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
export const getApplicationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { applicationId } = req.params;
        console.log("getApplicationDetails::", applicationId);
        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }
        // Fetch primary applicant details
        const primaryApplicant = yield User.findOne({ applicationId: applicationId })
            .populate('visaDataId')
            .lean();
        if (!primaryApplicant) {
            return res.status(404).json({ message: "Primary applicant not found" });
        }
        // Fetch linked family members
        const familyMembers = yield User.find({ primaryApplicationId: applicationId, _id: { $ne: primaryApplicant._id } })
            .populate('visaDataId')
            .lean();
        // Fetch application status
        const applicationStatus = yield ApplicationStatus.findOne({ applicationId: applicationId })
            .lean();
        const personalDataPromises = [primaryApplicant, ...familyMembers].map((member) => __awaiter(void 0, void 0, void 0, function* () {
            const personalData = yield PersonalData.findOne({ userId: member._id }).lean();
            return Object.assign(Object.assign({}, member), { personalData: personalData || null });
        }));
        const personalDataResults = yield Promise.all(personalDataPromises);
        const documentPromises = [primaryApplicant, ...familyMembers].map((member) => __awaiter(void 0, void 0, void 0, function* () {
            const documents = yield UserDocument.findOne({ userId: member._id }).lean();
            return Object.assign(Object.assign({}, member), { documents: documents || null });
        }));
        const documentResults = yield Promise.all(documentPromises);
        const formattedFamilyMembers = personalDataResults.filter(member => member._id !== primaryApplicant._id).map(member => {
            var _a;
            return Object.assign(Object.assign({}, member), { documents: ((_a = documentResults.find(doc => doc._id === member._id)) === null || _a === void 0 ? void 0 : _a.documents) || null });
        });
        const response = {
            message: "Application details fetched successfully",
            primaryApplicant: Object.assign(Object.assign({}, personalDataResults.find(member => member._id === primaryApplicant._id)), { documents: ((_a = documentResults.find(doc => doc._id === primaryApplicant._id)) === null || _a === void 0 ? void 0 : _a.documents) || null }),
            familyMembers: formattedFamilyMembers,
            applicationStatus: applicationStatus || null
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error fetching application details:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
export const updatePaymentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationId } = req.params;
        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }
        const applicationStatus = yield ApplicationStatus.findOne({ applicationId: applicationId });
        if (!applicationStatus) {
            return res.status(404).json({ message: "Application status not found" });
        }
        // Update the documentUpload field
        applicationStatus.payment = 'completed';
        // Save the updated document
        yield applicationStatus.save();
        res.status(200).json({
            message: "Payment status updated  successfully",
            updatedApplicationStatus: applicationStatus,
        });
    }
    catch (error) {
        console.error("Error updating Payment status:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
});
