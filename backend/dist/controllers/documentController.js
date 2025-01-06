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
import UserDocument from "../models/userDocument.js";
import Passport from "../models/userDocument.js";
export const uploadPassportImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("req.files", req.files);
    // console.log("req.body", req.body);
    console.log("this is run");
    try {
        const fileUrls = req.files.map((file) => ({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${file.filename}`,
        }));
        // Save passport data with passport images in the database.
        const updateData = {
            passportImages: req.files,
        };
        const filter = { userId: req.body.userId }; // Check if the document with the specific userId exists
        const update = {
            $set: updateData, // Update the fields in the document
        };
        const options = {
            returnDocument: "after", // Return the updated document after the operation
            upsert: true, // Create a new document if no match is found
        };
        const result = yield UserDocument.findOneAndUpdate(filter, update, options);
        if (result) {
            res
                .status(200)
                .json({ message: "Files uploaded successfully", files: fileUrls });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
});
export const uploadProofOfFundsImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileUrls = req.files.map((file) => ({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${file.filename}`,
        }));
        // Save passport data with passport images in the database.
        const updateData = {
            proofOfFundsImages: req.files,
        };
        const filter = { userId: req.body.userId }; // Check if the document with the specific userId exists
        const update = {
            $set: updateData, // Update the fields in the document
        };
        const options = {
            returnDocument: "after", // Return the updated document after the operation
            upsert: true, // Create a new document if no match is found
        };
        const result = yield UserDocument.findOneAndUpdate(filter, update, options);
        if (result) {
            res
                .status(200)
                .json({ message: "Files uploaded successfully", files: fileUrls });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
});
export const uploadProofOfTiesImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileUrls = req.files.map((file) => ({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${file.filename}`,
        }));
        // Save passport data with passport images in the database.
        const updateData = {
            proofOfTiesImages: req.files,
        };
        const filter = { userId: req.body.userId }; // Check if the document with the specific userId exists
        const update = {
            $set: updateData, // Update the fields in the document
        };
        const options = {
            returnDocument: "after", // Return the updated document after the operation
            upsert: true, // Create a new document if no match is found
        };
        const result = yield UserDocument.findOneAndUpdate(filter, update, options);
        if (result) {
            res.status(200).json({
                message: "Proof Of Ties to country uploaded successfully",
                files: fileUrls,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
});
export const uploadAdditionalDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileUrls = req.files.map((file) => ({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${file.filename}`,
        }));
        // Save passport data with passport images in the database.
        const updateData = {
            additionalDocuments: req.files,
        };
        const filter = { userId: req.body.userId }; // Check if the document with the specific userId exists
        const update = {
            $set: updateData, // Update the fields in the document
        };
        const options = {
            returnDocument: "after", // Return the updated document after the operation
            upsert: true, // Create a new document if no match is found
        };
        const result = yield UserDocument.findOneAndUpdate(filter, update, options);
        if (result) {
            res.status(200).json({
                message: "Additional Documents uploaded successfully",
                files: fileUrls,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
});
export const getSinglePassportData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log("getSinglePassportData is run");
        const userId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.userId;
        const result = yield Passport.findOne({ userId: userId });
        // console.log("find getSinglePassportData result", result);
        if ((result === null || result === void 0 ? void 0 : result.passportImages.length) > 0) {
            res
                .status(200)
                .json({ message: "Passport Data fetched successfully", result });
        }
        else {
            res.status(404).json({ message: "Passport Data Does Not Exist", result });
        }
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
export const getSingleProofOfFundsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
        const result = yield UserDocument.findOne({ userId: userId });
        // console.log("find getSinglePassportData result", result);
        if (((_b = result === null || result === void 0 ? void 0 : result.proofOfFundsImages) === null || _b === void 0 ? void 0 : _b.length) > 0)
            res
                .status(200)
                .json({ message: "Proof Of Funds Data fetched successfully", result });
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
export const getSingleProofOfTiesData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // console.log("getSingleProofOfTiesData is run");
        const userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
        const result = yield UserDocument.findOne({ userId: userId });
        // console.log("find getSinglePassportData result", result);
        if (((_b = result === null || result === void 0 ? void 0 : result.proofOfTiesImages) === null || _b === void 0 ? void 0 : _b.length) > 0)
            res.status(200).json({
                message: "Proof Of Ties to country Data fetched successfully",
                result,
            });
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
export const getAdditionalDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("getAdditionalDocuments is run");
        const userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
        const result = yield UserDocument.findOne({ userId: userId });
        // console.log("find getSinglePassportData result", result);
        if (((_b = result === null || result === void 0 ? void 0 : result.additionalDocuments) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            res.status(200).json({
                message: "Additional Documents Data fetched successfully",
                result,
            });
        }
        else {
            res.status(404).json({
                message: "Additional Documents Not Found",
                // result,
            });
        }
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
