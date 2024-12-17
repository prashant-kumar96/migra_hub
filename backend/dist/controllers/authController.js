var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//@ts-ignore
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";
import VisaData from "../models/visadata.js";
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("login is run");
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const { email, password } = req.body;
            const user = yield User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const isMatch = yield bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
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
        // return;
        const { email, password, name, role, data } = req.body;
        if (!data) {
            res.status(400).json({
                message: "Please fill all the steps from the index page before registering",
                extraInfo: "Info Incomplete",
            });
        }
        else {
            console.log("/register is run");
            try {
                const existingUser = yield User.findOne({ email: email });
                if (existingUser) {
                    return res.status(400).json({ message: "User already exists" });
                }
                const visadata = new VisaData(data);
                const resultVisadata = yield visadata.save();
                console.log("resultVisaData", resultVisadata);
                const hashedPassword = yield bcrypt.hash(password, 10);
                const user = new User({
                    email,
                    password: hashedPassword,
                    role,
                    name,
                    visaDataId: resultVisadata._id,
                });
                const result = yield user.save();
                console.log(result, "result");
                const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
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
        }
    });
}
const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
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
            const result = yield User.findByIdAndUpdate(id, { name, username });
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
            const result = yield User.findByIdAndDelete(req.query.id);
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
            const user = yield User.findOne({ _id: userID });
            console.log(user);
            // return;
            const isMatch = yield bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Old password is incorrect", status: 400 });
            }
            // Hash the new password
            const hashedNewPassword = yield bcrypt.hash(newPassword, 10);
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
function getUsersWhoHaveDonePayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Assuming the token payload contains the user ID
            const user = yield User.find({ isStripePaymentDone: true })
                .select("-password")
                .populate("assignedCaseManagerId");
            console.log("user", user);
            // const caseManagerData = await User.findById({
            //   _id: user[0].assignedCaseManagerId,
            // });
            // console.log("caseManagerData", caseManagerData);
            // const user = await User.aggregate([
            //   {
            //     $match: {
            //       isStripePaymentDone: true,
            //     },
            //   },
            //   {
            //     $lookup: {
            //       from: "User",
            //       localField: "assignedCaseManagerId",
            //       foreignField: "_id",
            //       as: "caseManagerData",
            //     },
            //   },
            //   {
            //     $match: {
            //       _id: Mongoose0.Types.ObjectId("yourOriginalDocumentId"), // Filter for the specific original document
            //     },
            //   },
            // ]);
            // console.log("user getUsersWhoHaveDonePayment", user);
            // return;
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({
                message: "Users fetched successfully",
                user: user,
            });
        }
        catch (error) {
            console.error("Error fetching user details:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
function getCaseManagers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Assuming the token payload contains the user ID
            const user = yield User.find({ role: "CASE_MANAGER" }).select("-password");
            if (!user) {
                return res.status(404).json({ message: "Case Managers not found" });
            }
            res.json({
                message: "Case Managers fetched successfully",
                user: user,
            });
        }
        catch (error) {
            console.error("Error fetching user details:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
function createCaseManager(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("req body", req.body);
        // return;
        const { email, password, name, role } = req.body;
        console.log("/register is run");
        try {
            const existingUser = yield User.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({ message: "Case Manager already exists" });
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            const user = new User({
                email,
                password: hashedPassword,
                role,
                name,
            });
            const result = yield user.save();
            console.log(result, "result");
            res.status(200).json({
                user: {
                    email: user.email,
                    id: user._id,
                    message: "Case Manager Created successfully",
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
function me(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoded = req.user;
        console.log(decoded, "decodedd");
        try {
            const userId = decoded.id; // Assuming the token payload contains the user ID
            const user = yield User.findById(userId).select("-password");
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
function checkifPaymentIsDone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            console.log("Checking if payment is done is run");
            // Assuming the token payload contains the user ID
            const user = yield User.findOne({ _id: (_a = req.query) === null || _a === void 0 ? void 0 : _a.userId }).select("-password");
            if ((user === null || user === void 0 ? void 0 : user.isStripePaymentDone) === true) {
                res.status(200).json({
                    message: "Stripe payment done",
                    status: true,
                });
            }
            else {
                return res
                    .status(200)
                    .json({ message: "Stripe payment Not done", status: false });
            }
        }
        catch (error) {
            console.error("Error fetching user details:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
export { login, register, deleteUser, editUser, changePassword, me, getUsersWhoHaveDonePayment, createCaseManager, getCaseManagers, checkifPaymentIsDone, };
