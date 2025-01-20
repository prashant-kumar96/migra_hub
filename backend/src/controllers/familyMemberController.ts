import ApplicationStatus from "../models/applicationStatus.js";
import PersonalData from "../models/personalData.js";
import User from "../models/User.js";
import VisaData from "../models/visadata.js";
// In your user controller file
import { v4 as uuidv4 } from "uuid";

// Helper function to generate a random 10-digit number as a string
function generateRandomPhoneNumber(): string {
  return String(Math.floor(1000000000 + Math.random() * 9000000000));
}

export async function addFamilyMember(req: any, res: any) {
  try {
    const { name, email, relationship, data, profileData } = req.body;
    const primaryApplicantId = req.user.id;
    console.log("add family member::", req.body, req.user);
    console.log("Primary Applicant ID:", primaryApplicantId);

    // Check if the primary applicant exists
    const primaryApplicant = await User.findById(primaryApplicantId);
    console.log("Primary Applicant:", primaryApplicant);
    if (!primaryApplicant) {
      return res.status(404).json({ message: "Primary applicant not found" });
    }

    if (!primaryApplicant.applicationId) {
      return res
        .status(400)
        .json({ message: "Primary application id is missing" });
    }

    if (!data) {
      return res.status(400).json({
        message:
          "Please fill all the steps from the index page before adding family member",
        extraInfo: "Info Incomplete",
      });
    }

    if (!profileData) {
      return res.status(400).json({
        message: "Please fill the personal data from the previous step",
      });
    }
    const existingUser = await User.findOne({ email: email });
    console.log("Existing User:", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("Visa Data about to be saved:", data);
    const visadata = new VisaData(data);
    const resultVisadata = await visadata.save();
    console.log("Visa Data Saved:", resultVisadata);

    const applicationId = uuidv4();

    // Create the family member user
    const familyMember = new User({
      name,
      email,
      role: "USER",
      applicationId: applicationId,
      primaryApplicationId: primaryApplicant.applicationId,
      visaDataId: resultVisadata._id,
      relationship,
      isPrimaryApplicant: false,
    });
    console.log("Family member about to be saved:", familyMember);
    const savedFamilyMember = await familyMember.save();
    console.log("Family member saved:", savedFamilyMember);

    // Check if personal data already exists for this user
    let personalData = await PersonalData.findOne({
      userId: savedFamilyMember._id,
    });
    console.log("Personal data from DB:", personalData);
    console.log("Personal data about to be saved:", profileData);
    // Generate random phone number if not provided
    const phoneNumber = profileData.phoneNumber
      ? profileData.phoneNumber
      : generateRandomPhoneNumber();

    if (personalData) {
      // PersonalData exists, update it
      console.log("Updating personal data");
      await PersonalData.updateOne(
        { userId: savedFamilyMember._id },
        {
          $set: {
            ...profileData,
            phoneNumber: phoneNumber,
            email: savedFamilyMember.email,
          },
        }
      );
    } else {
      // If not, create a new document
      console.log("Creating new personal data");
      personalData = new PersonalData({
        ...profileData,
        userId: savedFamilyMember._id,
        email: savedFamilyMember.email,
        phoneNumber: phoneNumber,
      });
      await personalData.save();
    }

    console.log("Personal Data Saved:", personalData);
    // Fetch the application status record
    const applicationStatus = await ApplicationStatus.findOne({
      applicationId: primaryApplicant.applicationId,
    });
    console.log("Application Status: ", applicationStatus);
    if (applicationStatus) {
      // Update the application status to completed
      console.log("Updating application status");
      await ApplicationStatus.updateOne(
        { _id: applicationStatus._id },
        { $set: { riskAssessment: "completed" } }
      );
    }

    res.status(201).json({
      message: "Family member added successfully",
      familyMember: savedFamilyMember,
    });
  } catch (error) {
    console.error("Error adding family member:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

export async function getFamilyMemberApplicationDetails(req: any, res: any) {
  try {
    const familyMemberId = req.query.userId; // Get from query params
    console.log("Family member id::", familyMemberId);
    if (!familyMemberId) {
      return res.status(400).json({ message: "Family member ID is required" });
    }

    const familyMember = await User.findById(familyMemberId).populate(
      "visaDataId"
    );

    if (!familyMember) {
      return res.status(404).json({ message: "Family member not found" });
    }

    const applicationStatus = await ApplicationStatus.findOne({
      applicationId: familyMember.primaryApplicationId,
    });

    res.status(200).json({
      familyMember: {
        ...familyMember.toObject(),
        applicationStatus: applicationStatus,
      },
      message: "Data fecthed successfully",
    });
  } catch (error) {
    console.error("Error fetching family member details:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

export async function getPrimaryApplicantLinkedFamilyMembers(
  req: any,
  res: any
) {
  try {
    const primaryApplicantId = req?.params?.userId;
    console.log("primaryApplicantId::", primaryApplicantId);

    // Check if the primary applicant exists
    const primaryApplicant = await User.findById(primaryApplicantId);
    if (!primaryApplicant) {
      return res.status(404).json({ message: "Primary applicant not found" });
    }
    if (!primaryApplicant.applicationId) {
      return res
        .status(400)
        .json({ message: "Primary application id is missing" });
    }

    const familyMembers = await User.find({
      primaryApplicationId: primaryApplicant.applicationId,
      _id: { $ne: primaryApplicantId }, // Exclude primary applicant
    }).populate("visaDataId"); // Populate visaDataId for the risk assessment data

    const formattedFamilyMembers = await Promise.all(
      familyMembers.map(async (member) => {
        const applicationStatus = await ApplicationStatus.findOne({
          applicationId: member.primaryApplicationId,
        });
        const personalData = await PersonalData.findOne({ userId: member._id });

        return {
          _id: member._id,
          applicationId: member.applicationId,
          name: member.name,
          email: member.email,
          relationship: member.relationship,
          visaData: member.visaDataId,
          applicationStatus: applicationStatus,
          passport_number: personalData?.passport_number,
          citizenshipCountry: personalData?.citizenshipCountry,
        };
      })
    );

    res.status(200).json({
      familyMembers: formattedFamilyMembers,
      message: "Family members details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching linked family members:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

export async function dashboardData(req: any, res: any) {
  try {
    const primaryApplicantId = req.user.id; // Get from auth middleware
    console.log(primaryApplicantId);

    const primaryApplicant = await User.findById(primaryApplicantId)
      .populate("visaDataId")
      .populate("applicationId");

    if (!primaryApplicant) {
      return res.status(404).json({ message: "Primary applicant not found" });
    }
    const familyMembers = await User.find({
      primaryApplicationId: primaryApplicant.applicationId,
      _id: { $ne: primaryApplicantId },
    })
      .populate("visaDataId")
      .populate("applicationId");

    res.status(200).json({
      primaryApplicant: primaryApplicant,
      familyMembers: familyMembers,
      message: "Data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

export async function deleteFamilyMember(req: any, res: any) {
  try {
    const familyMemberId = req.query.userId; // Get from request params
    console.log("Family member id::", familyMemberId);
    if (!familyMemberId) {
      return res.status(400).json({ message: "Family member ID is required" });
    } else {
      const familyMember = await User.findByIdAndDelete({
        _id: familyMemberId,
      });

      console.log("familyMember", familyMember);
      res.status(200).json({
        message: "Family Member deleted Successfully",
        result: familyMember,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Error deleting family member",
      result: err,
    });
  }
}
