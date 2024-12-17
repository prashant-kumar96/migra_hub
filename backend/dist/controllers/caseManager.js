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
export const assignCaseManagerToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("assignCaseManagerToUser is run");
        console.log("req.body", req.body);
        const result = yield User.findByIdAndUpdate({ _id: (_a = req.body) === null || _a === void 0 ? void 0 : _a.userId }, { $set: { assignedCaseManagerId: (_b = req.body) === null || _b === void 0 ? void 0 : _b.caseManagerId } }, { new: true }).select("-password");
        console.log("assignCaseManagerToUser result", result);
        if (result) {
            res.status(200).send({ message: "Case Manager assigned successfully" });
        }
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
export const getAssignedUsersToCaseManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("getAssignedUsersToCaseManager query", (_a = req.query) === null || _a === void 0 ? void 0 : _a.caseManagerId);
        const users = yield User.find({
            assignedCaseManagerId: new mongoose.Types.ObjectId((_b = req.query) === null || _b === void 0 ? void 0 : _b.caseManagerId),
        }).select("-password");
        // const users = await User.find();
        console.log("usrs", users);
        if (users.length > 0) {
            res.status(200).json({ message: "Users fetched successfully", users });
        }
        else {
            res.status(200).json({ message: "No users found", users });
        }
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
