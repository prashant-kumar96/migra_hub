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
export const savePersonalData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("saveProfileData is run");
    console.log("req.body", req.body);
    try {
        const personalData = new PersonalData(req.body);
        const result = yield personalData.save();
        console.log("savePersonalData result", result);
        if (result)
            res.status(200).json({ message: "Personal Data saved successfully" });
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
export const getSinglePersonalData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.userId;
        const result = yield PersonalData.findOne({ userId: userId });
        console.log("findSinglePersonalData result", result);
        if (result)
            res.status(200).json({ message: "Personal Data fetched successfully" });
    }
    catch (err) {
        console.log("ERROr=.>", err);
        res.status(400).json({ message: err });
    }
});
