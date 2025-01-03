import ApplicationStatus from "../models/applicationStatus.js";
import User from "../models/User.js";
import VisaData from "../models/visadata.js";
// In your user controller file
import { v4 as uuidv4 } from "uuid";


export async function addFamilyMember(req: any, res: any) {
    try {
        const { name, email, relationship, ...data } = req.body;
        const primaryApplicantId = req.user.id; // Assuming you're using middleware to auth
          console.log("add family member::", req.body, req.user)
        // Check if the primary applicant exists
        const primaryApplicant = await User.findById(primaryApplicantId);
        if (!primaryApplicant) {
            return res.status(404).json({ message: "Primary applicant not found" });
        }

        if(!primaryApplicant.applicationId){
            return res.status(400).json({ message: "Primary application id is missing" });
        }
        if (!data) {
            res.status(400).json({
                message:
                    "Please fill all the steps from the index page before adding family member",
                extraInfo: "Info Incomplete",
            });
             return;
        }


        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const visadata = new VisaData(data);
        const resultVisadata = await visadata.save();

        const applicationId = uuidv4();
         const applicationStatus = new ApplicationStatus({ userId: null, applicationId: applicationId });
         const resultApplicationStatus = await applicationStatus.save();


        // Create the family member user
        const familyMember = new User({
            name,
            email,
            role: "USER",
            applicationId: applicationId,
           primaryApplicationId: primaryApplicant.applicationId, // Store primary applicant's ID
            visaDataId: resultVisadata._id,
             relationship, // save the relationship value
            isPrimaryApplicant: false,
             applicationStatusId: resultApplicationStatus._id,
        });
        const savedFamilyMember = await familyMember.save();
      // update user id in application status table
       await ApplicationStatus.updateOne({ _id: resultApplicationStatus._id}, { userId: savedFamilyMember._id })


        res.status(201).json({ message: "Family member added successfully", familyMember: savedFamilyMember });
    } catch (error) {
        console.error("Error adding family member:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

         // In your user or family member controller
      export async function getFamilyMemberApplicationDetails(req: any, res: any) {
        
        try {
             const familyMemberId = req.query.userId; // Get from query params
            console.log("Family member id::", familyMemberId);
            if (!familyMemberId) {
                return res.status(400).json({ message: "Family member ID is required" });
            }

            const familyMember = await User.findById(familyMemberId)
                .populate("visaDataId")
                .populate("applicationStatusId");

             if (!familyMember) {
                return res.status(404).json({ message: "Family member not found" });
            }


            res.status(200).json({
               familyMember: familyMember,
               message:"Data fecthed successfully"
            });
        } catch (error) {
            console.error("Error fetching family member details:", error);
            res.status(500).json({ message: "Internal server error", error: error });
        }
    }


      // In your user or family member controller
      export // In your user or family member controller
      async function getPrimaryApplicantLinkedFamilyMembers(req: any, res: any) {
          try {
              const primaryApplicantId = req?.params?.userId;
              console.log("primaryApplicantId::", primaryApplicantId);
      
              // Check if the primary applicant exists
              const primaryApplicant = await User.findById(primaryApplicantId);
              if (!primaryApplicant) {
                  return res.status(404).json({ message: "Primary applicant not found" });
              }
              if (!primaryApplicant.applicationId) {
                  return res.status(400).json({ message: "Primary application id is missing" });
              }
      
              const familyMembers = await User.find({
                  primaryApplicationId: primaryApplicant.applicationId,
                  _id: { $ne: primaryApplicantId } // Exclude primary applicant
              }).populate('visaDataId').populate('applicationStatusId') // Populate visaDataId and applicationStatusId
      
               const formattedFamilyMembers = familyMembers.map(member => {
                 return {
                   _id: member._id,
                    applicationId: member.applicationId,
                     name: member.name,
                    email: member.email,
                     relationship: member.relationship,
                  visaData: member.visaDataId,
                     applicationStatus: member.applicationStatusId,
                 };
               })
      
      
              res.status(200).json({
                  familyMembers: formattedFamilyMembers,
                  message: "Family members details fetched successfully"
              });
          } catch (error) {
              console.error("Error fetching linked family members:", error);
              res.status(500).json({ message: "Internal server error", error: error });
          }
      }



    export async function dashboardData(req: any, res: any) {
        try {
            const primaryApplicantId = req.user.id; // Get from auth middleware
            console.log(primaryApplicantId)

            const primaryApplicant = await User.findById(primaryApplicantId).populate('visaDataId').populate('applicationStatusId');

             if(!primaryApplicant){
               return res.status(404).json({ message: "Primary applicant not found" });
             }
            const familyMembers = await User.find({
                 primaryApplicationId: primaryApplicant.applicationId,
                _id: { $ne: primaryApplicantId },
            }).populate('visaDataId').populate('applicationStatusId');


            res.status(200).json({
                primaryApplicant: primaryApplicant,
                familyMembers: familyMembers,
                message:"Data fetched successfully"
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            res.status(500).json({ message: "Internal server error", error: error });
        }
    }