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
import VisaData from "../models/visadata.js";
import mongoose from 'mongoose';
export const getSingleVisaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("getSingleVisaData is run");
        console.log("req.query", req.query);
        const visaDataId = req.query.visaDataId;
        if (!visaDataId) {
            console.warn("Warning: visaDataId is missing from query parameters.");
            return res.status(200).json({ data: null, message: "Visa data id not provided." });
        }
        //@ts-ignore
        if (!mongoose.Types.ObjectId.isValid(visaDataId)) {
            console.warn(`Warning: visaDataId is an invalid format: ${visaDataId}`);
            return res.status(200).json({ data: null, message: "Visa data id is not a valid ObjectId." });
        }
        const result = yield VisaData.findOne({ _id: visaDataId });
        if (!result) {
            console.warn(`Visa data not found for id: ${visaDataId}`);
            return res.status(200).json({ data: null, message: "Visa data not found." });
        }
        //@ts-ignore
        const _a = result.toObject(), { _id, createdAt, updatedAt, __v } = _a, rest = __rest(_a, ["_id", "createdAt", "updatedAt", "__v"]);
        console.log("rest", rest);
        res.status(200).json({ data: rest, message: "Visa data found." });
    }
    catch (err) {
        console.error("Error in getSingleVisaData:", err);
        if (err instanceof mongoose.Error.CastError) {
            return res.status(200).json({ data: null, message: `Invalid visaDataId, should be a valid MongoDB ObjectId: ${err.message}` });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});
