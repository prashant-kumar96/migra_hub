var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
//@ts-nocheck
import VisaData from "../models/visadata.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import ApplicationStatus from "../models/applicationStatus.js";
import { generateApplicationId } from "./authController.js";
export const getSingleVisaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("getSingleVisaData is run");
        console.log("req.query", req.query);
        const visaDataId = req.query.visaDataId;
        if (!visaDataId) {
            console.warn("Warning: visaDataId is missing from query parameters.");
            return res
                .status(200)
                .json({ data: null, message: "Visa data id not provided." });
        }
        //@ts-ignore
        if (!mongoose.Types.ObjectId.isValid(visaDataId)) {
            console.warn(`Warning: visaDataId is an invalid format: ${visaDataId}`);
            return res
                .status(200)
                .json({ data: null, message: "Visa data id is not a valid ObjectId." });
        }
        const result = yield VisaData.findOne({ _id: visaDataId });
        if (!result) {
            console.warn(`Visa data not found for id: ${visaDataId}`);
            return res
                .status(200)
                .json({ data: null, message: "Visa data not found." });
        }
        //@ts-ignore
        const _a = result.toObject(), { _id, createdAt, updatedAt, __v } = _a, rest = __rest(_a, ["_id", "createdAt", "updatedAt", "__v"]);
        console.log("rest", rest);
        res
            .status(200)
            .json({ data: rest, status: true, message: "Visa data found." });
    }
    catch (err) {
        console.error("Error in getSingleVisaData:", err);
        if (err instanceof mongoose.Error.CastError) {
            return res
                .status(200)
                .json({
                data: null,
                status: false,
                message: `Invalid visaDataId, should be a valid MongoDB ObjectId: ${err.message}`,
            });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});
export const addVisaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const visaData = new VisaData(req.body);
        const resultVisaData = yield visaData.save();
        console.log("resultVisaData", resultVisaData);
        // Generate ApplicationId only when visa data is created
        // const applicationId = uuidv4();
        const applicationId = generateApplicationId();
        // Find the user from the user id
        const user = yield User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // if user application id already exists, do not create again
        if (user.applicationId) {
            return res.status(400).json({ message: "Application id already exists" });
        }
        let applicationStatus = null;
        let applicationStatusId = null;
        // **FIX: Check if an ApplicationStatus already exists for this user**
        applicationStatus = yield ApplicationStatus.findOne({ userId: user._id });
        if (applicationStatus) {
            applicationStatusId = applicationStatus._id;
        }
        else {
            // Create new application status if one doesn't exist
            applicationStatus = new ApplicationStatus({
                userId: user._id,
                applicationId: applicationId,
            });
            const resultApplicationStatus = yield applicationStatus.save();
            applicationStatusId = resultApplicationStatus._id;
        }
        // Update the user object with application id
        user.applicationId = applicationId;
        user.visaDataId = resultVisaData._id;
        user.isPrimaryApplicant = true;
        yield user.save();
        // Update the application status to completed
        yield ApplicationStatus.updateOne({ _id: applicationId }, { $set: { riskAssessment: "completed" } });
        res.status(201).json({
            message: "Visa data created successfully",
            visaDataId: resultVisaData._id,
            applicationId: applicationId,
        });
    }
    catch (error) {
        console.error("Error creating visa data:", error);
        res.status(500).json({ message: "Failed to create visa data", error });
    }
});
export const updateVisaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { visaDataId } = _a, updateData = __rest(_a, ["visaDataId"]);
    if (!visaDataId) {
        return res.status(400).json({ message: "Visa data ID is required." });
    }
    try {
        const updatedVisaData = yield VisaData.findByIdAndUpdate(visaDataId, updateData, { new: true });
        if (!updatedVisaData) {
            return res.status(404).json({ message: "Visa data not found" });
        }
        res.status(200).json({
            message: "Visa data updated successfully",
            updatedVisaData,
        });
    }
    catch (error) {
        console.error("Error updating visa data:", error);
        res.status(500).json({ message: "Failed to update visa data", error });
    }
});
