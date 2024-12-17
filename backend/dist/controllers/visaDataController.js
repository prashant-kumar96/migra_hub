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
export const getSingleVisaData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("getSingleVisaData is run");
        console.log("req.paramss", req.query);
        const result = yield VisaData.findOne({ _id: req.query.visaDataId });
        console.log("getSingleVisaDataresult", result);
        const _a = result === null || result === void 0 ? void 0 : result.toObject(), { _id, createdAt, updatedAt, __v } = _a, rest = __rest(_a, ["_id", "createdAt", "updatedAt", "__v"]);
        console.log("rest", rest);
        res.status(200).json({ data: rest });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
});
