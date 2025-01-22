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
import VisaData from "../models/visadata.js";
import { generateApplicationId } from "./authController.js";
// Helper function to generate a random 10-digit number as a string
function generateRandomPhoneNumber() {
    return String(Math.floor(1000000000 + Math.random() * 9000000000));
}
export function addFamilyMember(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, relationship, data, profileData } = req.body;
            console.log("req.body", req.body);
            const primaryApplicantId = req.user.id;
            console.log("add family member::", req.body, req.user);
            console.log("Primary Applicant ID:", primaryApplicantId);
            // Check if the primary applicant exists
            const primaryApplicant = yield User.findById(primaryApplicantId);
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
                    message: "Please fill all the steps from the index page before adding family member",
                    extraInfo: "Info Incomplete",
                });
            }
            if (!profileData) {
                return res.status(400).json({
                    message: "Please fill the personal data from the previous step",
                });
            }
            const existingUser = yield User.findOne({ email: email });
            console.log("Existing User:", existingUser);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            console.log("Visa Data about to be saved:", data);
            const visadata = new VisaData(data);
            const resultVisadata = yield visadata.save();
            console.log("Visa Data Saved:", resultVisadata);
            // const applicationId = uuidv4();
            const applicationId = generateApplicationId();
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
            const savedFamilyMember = yield familyMember.save();
            console.log("Family member saved:", savedFamilyMember);
            // Check if personal data already exists for this user
            let personalData = yield PersonalData.findOne({
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
                yield PersonalData.updateOne({ userId: savedFamilyMember._id }, {
                    $set: Object.assign(Object.assign({}, profileData), { phoneNumber: phoneNumber, email: savedFamilyMember.email }),
                });
            }
            else {
                // If not, create a new document
                console.log("Creating new personal data");
                personalData = new PersonalData(Object.assign(Object.assign({}, profileData), { userId: savedFamilyMember._id, email: savedFamilyMember.email, phoneNumber: phoneNumber }));
                yield personalData.save();
            }
            console.log("Personal Data Saved:", personalData);
            // Fetch the application status record
            const applicationStatus = yield ApplicationStatus.findOne({
                applicationId: primaryApplicant.applicationId,
            });
            console.log("Application Status: ", applicationStatus);
            if (applicationStatus) {
                // Update the application status to completed
                console.log("Updating application status");
                yield ApplicationStatus.updateOne({ _id: applicationStatus._id }, { $set: { riskAssessment: "completed" } });
            }
            res.status(201).json({
                message: "Family member added successfully",
                familyMember: savedFamilyMember,
            });
        }
        catch (error) {
            console.error("Error adding family member:", error);
            res.status(500).json({ message: "Internal server error", error: error });
        }
    });
}
export function editFamilyMember(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { name, email, relationship, data, profileData } = req.body;
            console.log("EditFamilyMember is run");
            console.log("req.query?.id", (_a = req.query) === null || _a === void 0 ? void 0 : _a.id);
            console.log("req.body", req.body);
            const userDetails = yield User.findByIdAndUpdate({ _id: (_b = req.query) === null || _b === void 0 ? void 0 : _b.id }, {
                $set: {
                    name: name,
                    email: email,
                    relationship: relationship,
                },
            }, { new: true });
            console.log("userDetails", userDetails);
            console.log("Updating personal data");
            const personalData = yield PersonalData.updateOne({ userId: userDetails._id }, {
                $set: Object.assign(Object.assign({}, profileData), { email: email }),
            });
            console.log("personalData", personalData);
            const VisaDataResult = yield VisaData.findByIdAndUpdate({ _id: userDetails === null || userDetails === void 0 ? void 0 : userDetails.visaDataId }, {
                $set: {
                    deniedVisaToAnyCountry: data.deniedVisaToAnyCountry,
                },
            });
            console.log("VisaDataResult", VisaDataResult);
            if (userDetails && VisaDataResult && personalData) {
                res.status(200).json({
                    message: "Family member updated successfully",
                });
            }
            else {
                res.status(400).json({
                    message: "There is some Error",
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
export function getFamilyMemberApplicationDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const familyMemberId = req.query.userId; // Get from query params
            console.log("Family member id::", familyMemberId);
            if (!familyMemberId) {
                return res.status(400).json({ message: "Family member ID is required" });
            }
            const familyMember = yield User.findById(familyMemberId).populate("visaDataId");
            if (!familyMember) {
                return res.status(404).json({ message: "Family member not found" });
            }
            const applicationStatus = yield ApplicationStatus.findOne({
                applicationId: familyMember.primaryApplicationId,
            });
            res.status(200).json({
                familyMember: Object.assign(Object.assign({}, familyMember.toObject()), { applicationStatus: applicationStatus }),
                message: "Data fecthed successfully",
            });
        }
        catch (error) {
            console.error("Error fetching family member details:", error);
            res.status(500).json({ message: "Internal server error", error: error });
        }
    });
}
export function getPrimaryApplicantLinkedFamilyMembers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const primaryApplicantId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
            console.log("primaryApplicantId::", primaryApplicantId);
            // Check if the primary applicant exists
            const primaryApplicant = yield User.findById(primaryApplicantId);
            if (!primaryApplicant) {
                return res.status(404).json({ message: "Primary applicant not found" });
            }
            if (!primaryApplicant.applicationId) {
                return res
                    .status(400)
                    .json({ message: "Primary application id is missing" });
            }
            const familyMembers = yield User.find({
                primaryApplicationId: primaryApplicant.applicationId,
                _id: { $ne: primaryApplicantId }, // Exclude primary applicant
            }).populate("visaDataId"); // Populate visaDataId for the risk assessment data
            const formattedFamilyMembers = yield Promise.all(familyMembers.map((member) => __awaiter(this, void 0, void 0, function* () {
                const applicationStatus = yield ApplicationStatus.findOne({
                    applicationId: member.primaryApplicationId,
                });
                const personalData = yield PersonalData.findOne({ userId: member._id });
                console.log("personalData", personalData);
                return {
                    _id: member._id,
                    applicationId: member.applicationId,
                    name: member.name,
                    email: member.email,
                    relationship: member.relationship,
                    visaData: member.visaDataId,
                    applicationStatus: applicationStatus,
                    passport_number: personalData === null || personalData === void 0 ? void 0 : personalData.passport_number,
                    passport_expiry: personalData === null || personalData === void 0 ? void 0 : personalData.passport_expiry,
                    citizenshipCountry: personalData === null || personalData === void 0 ? void 0 : personalData.citizenshipCountry,
                };
            })));
            res.status(200).json({
                familyMembers: formattedFamilyMembers,
                message: "Family members details fetched successfully",
            });
        }
        catch (error) {
            console.error("Error fetching linked family members:", error);
            res.status(500).json({ message: "Internal server error", error: error });
        }
    });
}
export function getSingleFamilyMemberDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("getSingleFamilyMemberDetails is run");
            const userId = req.query.userId;
            const UserDetails = yield User.findOne({ _id: userId });
            console.log("UserDetails", UserDetails);
        }
        catch (error) {
            console.error("Error fetching linked family members:", error);
            res.status(500).json({ message: "Internal server error", error: error });
        }
    });
}
export function dashboardData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const primaryApplicantId = req.user.id; // Get from auth middleware
            console.log(primaryApplicantId);
            const primaryApplicant = yield User.findById(primaryApplicantId)
                .populate("visaDataId")
                .populate("applicationId");
            if (!primaryApplicant) {
                return res.status(404).json({ message: "Primary applicant not found" });
            }
            const familyMembers = yield User.find({
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
        }
        catch (error) {
            console.error("Error fetching dashboard data:", error);
            res.status(500).json({ message: "Internal server error", error: error });
        }
    });
}
export function deleteFamilyMember(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const familyMemberId = req.query.userId; // Get from request params
            console.log("Family member id::", familyMemberId);
            if (!familyMemberId) {
                return res.status(400).json({ message: "Family member ID is required" });
            }
            else {
                const familyMember = yield User.findByIdAndDelete({
                    _id: familyMemberId,
                });
                console.log("familyMember", familyMember);
                res.status(200).json({
                    message: "Family Member deleted Successfully",
                    result: familyMember,
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json({
                message: "Error deleting family member",
                result: err,
            });
        }
    });
}
