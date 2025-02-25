var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//@ts-nocheck
import User from "../models/User.js";
import mongoose from "mongoose";
import PersonalData from "../models/personalData.js";
import UserDocument from "../models/userDocument.js";
import ApplicationStatus from "../models/applicationStatus.js";
export const assignCaseManagerToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("assignCaseManagerToUser started");
        const { applicationId, caseManagerId, userId } = req.body;
        console.log("req.body", req.body);
        const result = yield User.findByIdAndUpdate({ _id: userId }, { $set: { assignedCaseManagerId: caseManagerId } }, { new: true }).select("-password");
        console.log("assignCaseManagerToUser result", result);
        const applicationStatus = yield ApplicationStatus.findOne({ applicationId: applicationId });
        if (applicationStatus) {
            // Update the application status to assigned case manager
            yield ApplicationStatus.updateOne({ _id: applicationStatus._id }, { $set: { assignedCaseManager: true } });
        }
        if (result) {
            res.status(200).send({ message: "Case Manager assigned successfully" });
        }
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
});
export const getAssignedUsersToCaseManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("getAssignedUsersToCaseManager query", (_a = req.query) === null || _a === void 0 ? void 0 : _a.caseManagerId);
        const users = yield User.find({
            assignedCaseManagerId: new mongoose.Types.ObjectId((_b = req.query) === null || _b === void 0 ? void 0 : _b.caseManagerId),
        })
            .select("-password")
            .lean(); // using .lean() for performance
        if (!users || users.length === 0) {
            return res
                .status(200)
                .json({ message: "No users found", users: [] });
        }
        const populatedUsers = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            let populatedUser = Object.assign({}, user); // Create a copy of user
            if (user.applicationId) {
                const applicationStatus = yield ApplicationStatus.findOne({
                    applicationId: user.applicationId,
                }).select('status').lean();
                if (applicationStatus) {
                    populatedUser = Object.assign(Object.assign({}, user), { status: applicationStatus.status });
                }
                else {
                    populatedUser = Object.assign(Object.assign({}, user), { status: 'N/A' });
                }
            }
            else {
                populatedUser = Object.assign(Object.assign({}, user), { status: 'N/A' });
            }
            return populatedUser;
        })));
        console.log("populatedUsers", populatedUsers);
        res
            .status(200)
            .json({ message: "Users fetched successfully", users: populatedUsers });
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
export const getAllDetailsOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        console.log("getAllDetailsOfUser query", (_a = req.query) === null || _a === void 0 ? void 0 : _a.userId);
        const user = yield User.findOne({ _id: (_b = req.query) === null || _b === void 0 ? void 0 : _b.userId })
            .populate("visaDataId")
            .select("-password");
        // console.log("user getAllDetailsOfUser", user);
        const personalData = yield PersonalData.find({
            userId: new mongoose.Types.ObjectId((_c = req.query) === null || _c === void 0 ? void 0 : _c.userId),
        });
        const document = yield UserDocument.find({
            userId: new mongoose.Types.ObjectId((_d = req.query) === null || _d === void 0 ? void 0 : _d.userId),
        });
        // console.log("personalData", personalData);
        // console.log("documents", documents);
        const data = {
            user,
            personalData,
            document,
        };
        console.log("data", data);
        if (data) {
            res.status(200).json({ message: "User Data fetched Successfully", data });
        }
        else {
            res.status(200).json({ message: "No user Data found" });
        }
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
