// application.controller.ts

import ApplicationStatus from "../models/applicationStatus.js";
import PersonalData from "../models/personalData.js";
import User from "../models/User.js";
import UserDocument from "../models/userDocument.js";
import VisaData from "../models/visadata.js";


export const getApplicationStatusDetails = async (req: any, res: any) => {
    try {
        const { applicationId } = req.params;
        console.log("applicationId::", applicationId);

        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }

        const applicationStatus = await ApplicationStatus.findOne({applicationId: applicationId});

        if (!applicationStatus) {
            return res.status(404).json({ message: "Application status not found" });
        }

         const user = await User.findOne({applicationId}).populate('visaDataId');
          let personalData = null;
            let destinationCountry = null;

            if(user){
                 personalData = await PersonalData.findOne({userId: user._id});
                 if(user.visaDataId){
                  const visaData = await VisaData.findById(user.visaDataId)
                  destinationCountry = visaData?.destinationCountry
              }
        }

         const response = {
            message: "Application status details fetched successfully",
            applicationStatus: applicationStatus,
            name:personalData?.first_name,
            passport_number: personalData?.passport_number,
            citizenshipCountry: personalData?.citizenshipCountry,
            destinationCountry: destinationCountry
        };


        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching application status details:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
};



export const updateDocumentUploadStatus = async (req: any, res: any) => {
    try {
        const { applicationId } = req.params;

        if (!applicationId) {
            return res.status(400).json({ message: "Application  ID is required" });
        }

        const applicationStatus = await ApplicationStatus.findOne({applicationId: applicationId});

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


export const getApplicationDetails = async (req: any, res: any) => {
    try {
        const { applicationId } = req.params;
        console.log("getApplicationDetails::", applicationId);

        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }

        // Fetch primary applicant details
        const primaryApplicant = await User.findOne({ applicationId: applicationId })
            .populate('visaDataId')
             .lean();

        if (!primaryApplicant) {
            return res.status(404).json({ message: "Primary applicant not found" });
        }


        // Fetch linked family members
        const familyMembers = await User.find({ primaryApplicationId: applicationId, _id: { $ne: primaryApplicant._id } })
            .populate('visaDataId')
           .lean();


        // Fetch application status
        const applicationStatus = await ApplicationStatus.findOne({ applicationId: applicationId })
            .lean();

           const personalDataPromises = [primaryApplicant, ...familyMembers].map(async (member) => {
              const personalData = await PersonalData.findOne({ userId: member._id }).lean()
                  return {
                        ...member,
                        personalData: personalData || null
                    };
          })
        const personalDataResults = await Promise.all(personalDataPromises)


          const documentPromises = [primaryApplicant, ...familyMembers].map(async (member) => {
              const documents = await UserDocument.findOne({userId: member._id}).lean()
                 return {
                     ...member,
                    documents: documents || null,
                };
        });

          const documentResults = await Promise.all(documentPromises)




        const formattedFamilyMembers = personalDataResults.filter(member=> member._id !== primaryApplicant._id).map(member => {
            return {
                ...member,
                documents: documentResults.find(doc => doc._id === member._id )?.documents || null
            }
        })

        const response = {
            message: "Application details fetched successfully",
            primaryApplicant: {
                ...personalDataResults.find(member=> member._id === primaryApplicant._id),
                  documents: documentResults.find(doc => doc._id === primaryApplicant._id )?.documents || null

            },
            familyMembers: formattedFamilyMembers,
             applicationStatus: applicationStatus || null
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching application details:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
};


export const updatePaymentStatus = async (req: any, res: any) => {
    try {
        const { applicationId } = req.params;

        if (!applicationId) {
            return res.status(400).json({ message: "Application ID is required" });
        }

         const applicationStatus = await ApplicationStatus.findOne({applicationId: applicationId});

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