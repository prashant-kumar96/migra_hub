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
import UserDocument from "../models/userDocument.js";
import Passport from "../models/userDocument.js";
import mongoose from "mongoose";
export const uploadDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("upload documents", req.body);
        const { files, documentType, userId } = req.body;
        if (!userId || !documentType || Object.keys(files).length === 0) {
            return res.status(400).json({ message: "User ID, document type, and files are required" });
        }
        let updateData = {};
        for (const documentTypeKey in files) {
            const filesArray = files[documentTypeKey];
            const uploadArray = [];
            for (const file of filesArray) {
                const { buffer, name, type } = file;
                const bufferData = Buffer.from(buffer);
                // Handle Uploading to a local file system
                const filePath = `./uploads/${Date.now()}-${name}`;
                const fileUrl = `${process.env.API_URL}uploads/${Date.now()}-${name}`;
                // const filePath = path.join("uploads", `${Date.now()}-${file.name}`)
                // Save the buffer
                console.log("save", filePath);
                require('node:fs').writeFileSync(filePath, bufferData);
                uploadArray.push({
                    path: fileUrl,
                    originalname: name,
                    mimetype: type
                });
            }
            updateData[documentTypeKey] = uploadArray;
        }
        const filter = { userId: userId };
        const update = { $set: updateData };
        const options = {
            returnDocument: "after",
            upsert: true,
        };
        const result = yield UserDocument.findOneAndUpdate(filter, update, options);
        if (result) {
            res.status(200).json({
                message: "Files uploaded successfully",
                files: Object.keys(updateData).map(key => updateData[key]),
            });
        }
        else {
            res.status(404).json({ message: "User document not found" });
        }
    }
    catch (error) {
        console.error("Error uploading documents:", error);
        res.status(500).json({ message: "Upload failed", error: error });
    }
});
export const uploadPassportImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("req.files", req.files);
    // console.log("req.body", req.body);
    console.log('uploading passport images');
    console.log("upload Passport Images", req.body);
    try {
        const fileUrls = req.files.map((file) => ({
            url: `${process.env.API_URL}uploads/${file.filename}`,
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
                .json({ status: true, message: "Files uploaded successfully", files: fileUrls });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: true, message: "Upload failed" });
    }
});
export const uploadProofOfFundsImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('uploading proof of funds images');
        const fileUrls = req.files.map((file) => ({
            url: `${process.env.API_URL}uploads/${file.filename}`,
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
                .json({ status: true, message: "Files uploaded successfully", files: fileUrls });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: true, message: "Upload failed" });
    }
});
export const uploadProofOfTiesImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('uploading proof of  images');
        const fileUrls = req.files.map((file) => ({
            url: `${process.env.API_URL}uploads/${file.filename}`,
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
        res.status(500).json({ status: true, message: "Upload failed" });
    }
});
export const uploadAdditionalDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileUrls = req.files.map((file) => ({
            url: `${process.env.API_URL}uploads/${file.filename}`,
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
        res.status(500).json({ status: true, message: "Upload failed" });
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
                .json({ status: true, message: "Passport Data fetched successfully", result });
        }
        else {
            res.status(404).json({ status: true, message: "Passport Data Does Not Exist", result });
        }
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ status: false, message: err });
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
                .json({ status: true, message: "Proof Of Funds Data fetched successfully", result });
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ status: false, message: err });
    }
});
export const getUploadedDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Fetching documents...');
        const userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
        console.log('user id', userId);
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required to fetch documents.",
            });
        }
        // Convert userId to ObjectId
        const objectId = mongoose.Types.ObjectId.isValid(userId)
            ? new mongoose.Types.ObjectId(userId)
            : null;
        if (!objectId) {
            return res.status(400).json({
                status: false,
                message: "Invalid User ID format.",
            });
        }
        const result = yield UserDocument.findOne({ userId: objectId });
        console.log('Found documents:', result);
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Documents fetched successfully.",
                result,
            });
        }
        // No documents found case
        return res.status(200).json({
            status: false,
            message: "No documents found for the provided user ID.",
        });
    }
    catch (err) {
        console.error("Error fetching documents:", err);
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching documents.",
            error: err.message,
        });
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
                status: true,
                message: "Proof Of Ties to country Data fetched successfully",
                result,
            });
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ status: false, message: err });
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
                status: true,
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
        res.status(400).json({ status: false, message: err });
    }
});
