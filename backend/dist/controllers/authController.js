"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.changePassword = changePassword;
exports.me = me;
//@ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("login is run");
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const { email, password } = req.body;
            const user = yield user_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
            res.status(200).json({
                token,
                user: { username: user.username, id: user._id, role: user.role },
            });
        }
        catch (error) {
            console.log("error", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const JWT_SECRET = process.env.JWT_SECRET;
        console.log("req body", req.body);
        const { email, password, name, role } = req.body;
        console.log("/register is run");
        try {
            const existingUser = yield user_1.default.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = new user_1.default({
                email,
                password: hashedPassword,
                role,
                name,
            });
            const result = yield user.save();
            console.log(result, "result");
            const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
            res.status(200).json({
                token,
                user: {
                    email: user.email,
                    id: user._id,
                    message: "User registered successfully",
                    role: user.role,
                },
            });
        }
        catch (error) {
            console.log("Error", error);
            res.status(500).json({ message: "Internal server error", error });
        }
    });
}
const isValidObjectId = (id) => {
    return mongoose_1.default.Types.ObjectId.isValid(id);
};
function editUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("id", req.query.id);
        console.log(req.body);
        console.log("editUser is run");
        const { id, name, username } = req.body.userDetails;
        try {
            if (!id) {
                res.status(400).json({ message: "Please provide id in query" });
            }
            if (!isValidObjectId(id)) {
                return res.status(400).json({ message: "Invalid user ID format." });
            }
            const result = yield user_1.default.findByIdAndUpdate(id, { name, username });
            console.log(result);
            if (!result) {
                res.status(400).json({ message: "User not found" });
            }
            else {
                res.status(200).json({ message: "User Edited Successfully" });
            }
        }
        catch (err) {
            console.log("error", err);
            res.status(400).json({ message: err.message });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("id", req.query.id);
        console.log("deleteUser is run");
        try {
            if (!req.query.id) {
                res.status(400).json({ message: "Please provide id in query" });
            }
            if (!isValidObjectId(req.query.id)) {
                return res.status(400).json({ message: "Invalid user ID format." });
            }
            const result = yield user_1.default.findByIdAndDelete(req.query.id);
            console.log(result);
            if (!result) {
                res.status(400).json({ message: "User not found" });
            }
            else {
                res.status(200).json({ message: "User deleted Successfully" });
            }
        }
        catch (err) {
            console.log("error", err);
            res.status(400).json({ message: err.message });
        }
    });
}
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("id", req.query.id);
        console.log("changePassword is run");
        console.log(req.body);
        const { userID, oldPassword, newPassword } = req.body;
        try {
            const user = yield user_1.default.findOne({ _id: userID });
            console.log(user);
            // return;
            const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Old password is incorrect", status: 400 });
            }
            // Hash the new password
            const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
            // Update the user's password in the database
            user.password = hashedNewPassword;
            yield user.save();
            res
                .status(200)
                .json({ message: "Password changed successfully", status: 200 });
        }
        catch (err) {
            console.log("error", err);
            res.status(400).json({ message: err.message, status: 400 });
        }
    });
}
function me(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = req.user;
        console.log(decoded, "decodedd");
        try {
            const userId = decoded.id; // Assuming the token payload contains the user ID
            const user = yield user_1.default.findById(userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({
                message: "User details fetched successfully",
                user: user,
            });
        }
        catch (error) {
            console.error("Error fetching user details:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
