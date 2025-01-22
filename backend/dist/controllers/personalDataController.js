//@ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PersonalData from "../models/personalData.js";
import ApplicationStatus from "../models/applicationStatus.js";
import User from "../models/User.js";
export const savePersonalData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("saveProfileData is run");
    console.log("req.body", req.body);
    try {
        const personalData = new PersonalData(req.body);
        const result = yield personalData.save();
        console.log("savePersonalData result", result);
        if (result) {
            const userId = req.body.userId;
            const user = yield User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (user && user.applicationId) {
                yield ApplicationStatus.updateOne({ applicationId: user.applicationId }, { $set: { profileCompletion: "completed" } });
            }
        }
        res.status(200).json({ message: "Personal Data saved successfully" });
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
export const updatePersonalData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("updatePersonalData is run");
    console.log("req.body", req.body);
    const { userId, phoneNumber, dob, passport_number, passport_expiry, marital_status, gender } = req.body;
    try {
        // Validate required fields
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        // Prepare the fields to update
        const updateFields = {};
        if (phoneNumber)
            updateFields.phoneNumber = phoneNumber;
        if (dob)
            updateFields.dob = dob;
        if (passport_number)
            updateFields.passport_number = passport_number;
        if (passport_expiry)
            updateFields.passport_expiry = passport_expiry;
        if (marital_status)
            updateFields.marital_status = marital_status;
        if (gender)
            updateFields.gender = gender;
        // Update only the specified fields
        const personalData = yield PersonalData.findOneAndUpdate({ userId }, // Match the userId
        { $set: updateFields }, // Update only the specified fields
        { new: true, upsert: false } // Return the updated document, do not create if not exists
        );
        if (!personalData) {
            return res.status(404).json({ message: "Personal data not found for the given user" });
        }
        console.log("Updated Personal Data:", personalData);
        // Check if the user exists
        const user = yield User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update application status if applicable
        if (user.applicationId) {
            const updateStatus = yield ApplicationStatus.updateOne({ applicationId: user.applicationId }, { $set: { profileCompletion: "completed" } });
            console.log("Application Status Update Result:", updateStatus);
        }
        res.status(200).json({ message: "Personal data updated successfully" });
    }
    catch (err) {
        console.error("Error in updatePersonalData:", err);
        res.status(500).json({ message: "An error occurred while updating personal data", error: err.message });
    }
});
export const getSinglePersonalData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required",
                data: null
            });
        }
        const result = yield PersonalData.findOne({ userId: userId });
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Personal Data fetched successfully",
                data: result
            });
        }
        // If no data found, return 200 with empty data
        return res.status(200).json({
            status: false,
            message: "No personal data found for this user",
            data: null
        });
    }
    catch (err) {
        console.error("Error fetching personal data:", err);
        return res.status(500).json({
            status: false,
            message: "Error fetching personal data",
            error: err instanceof Error ? err.message : "Unknown error occurred"
        });
    }
});
