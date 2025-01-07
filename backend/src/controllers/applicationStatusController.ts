// application.controller.ts

import ApplicationStatus from "../models/applicationStatus.js";

 
export const getApplicationStatusDetails = async (req: any, res: any) => {
    try {
        const { applicationStatusId } = req.params;
        console.log("applicationStatusId::", applicationStatusId);

        if (!applicationStatusId) {
            return res.status(400).json({ message: "Application status ID is required" });
        }

        const applicationStatus = await ApplicationStatus.findById(applicationStatusId);

        if (!applicationStatus) {
            return res.status(404).json({ message: "Application status not found" });
        }

        res.status(200).json({
            message: "Application status details fetched successfully",
            applicationStatus: applicationStatus,
        });
    } catch (error) {
        console.error("Error fetching application status details:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
};



export const updateDocumentUploadStatus = async (req: any, res: any) => {
    try {
        const { applicationStatusId } = req.params;

        if (!applicationStatusId) {
            return res.status(400).json({ message: "Application status ID is required" });
        }

        const applicationStatus = await ApplicationStatus.findById(applicationStatusId);

        if (!applicationStatus) {
            return res.status(404).json({ message: "Application status not found" });
        }

        // Update the documentUpload field
        applicationStatus.documentUpload = 'completed';

        // Save the updated document
        await applicationStatus.save();


        res.status(200).json({
            message: "Document upload status updated to completed successfully",
            updatedApplicationStatus: applicationStatus,
        });

    } catch (error) {
        console.error("Error updating document upload status:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
};




export const updatePaymentStatus = async (req: any, res: any) => {
    try {
        const { applicationStatusId } = req.params;

        if (!applicationStatusId) {
            return res.status(400).json({ message: "Application status ID is required" });
        }

        const applicationStatus = await ApplicationStatus.findById(applicationStatusId);

        if (!applicationStatus) {
            return res.status(404).json({ message: "Application status not found" });
        }

        // Update the documentUpload field
        applicationStatus.payment = 'completed';

        // Save the updated document
        await applicationStatus.save();


        res.status(200).json({
            message: "Payment status updated  successfully",
            updatedApplicationStatus: applicationStatus,
        });

    } catch (error) {
        console.error("Error updating Payment status:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
};

