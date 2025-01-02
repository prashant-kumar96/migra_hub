import ApplicationStatus from "../models/applicationStatus.js";
import User from "../models/User.js";
import VisaData from "../models/visadata.js";
// In your user controller file
import { v4 as uuidv4 } from "uuid";


  export async function addFamilyMember(req: any, res: any) {
        try {
            const { name, email, data, relationship } = req.body;
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
            }


            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }


            const visadata = new VisaData(data);
            const resultVisadata = await visadata.save();


             const applicationStatus = new ApplicationStatus({ userId: null });
             const resultApplicationStatus = await applicationStatus.save();
              const applicationId = uuidv4();
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