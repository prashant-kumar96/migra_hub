"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// authenticate
// Import the 'dotenv' package
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Configure dotenv to load environment variables from the .env file
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET; // Make sure to set this in your environment variables
const verifyToken = (req, res, next) => {
    var _a;
    console.log("verifyToken is run");
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        console.log("Token is required");
        return res.status(401).json({ message: "Token is required" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the decoded token payload to the request object
        console.log(decoded, "decoded");
        next();
    }
    catch (error) {
        console.log(error, "error");
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.default = verifyToken;
