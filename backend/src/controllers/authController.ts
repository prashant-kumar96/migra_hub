//@ts-ignore
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.js";
import VisaData from "../models/visadata.js";
import ObjectId from "mongoose";

async function login(req: any, res: any) {
  console.log("login is run");
  try {
    const JWT_SECRET: any = process.env.JWT_SECRET;
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({
      token,
      user: { username: user.username, id: user._id, role: user.role },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function register(req: any, res: any) {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  console.log("req body", req.body);
  // return;
  const { email, password, name, role, data } = req.body;
  if (!data) {
    res.status(400).json({
      message:
        "Please fill all the steps from the index page before registering",
      extraInfo: "Info Incomplete",
    });
  } else {
    console.log("/register is run");
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const visadata = new VisaData(data);
      const resultVisadata = await visadata.save();
      console.log("resultVisaData", resultVisadata);

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        role,
        name,
        visaDataId: resultVisadata._id,
      });
      const result = await user.save();
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
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

const isValidObjectId = (id: any) => {
  return mongoose.Types.ObjectId.isValid(id);
};

async function editUser(req: any, res: any) {
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
    const result = await User.findByIdAndUpdate(id, { name, username });
    console.log(result);
    if (!result) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User Edited Successfully" });
    }
  } catch (err: any) {
    console.log("error", err);
    res.status(400).json({ message: err.message });
  }
}

async function deleteUser(req: any, res: any) {
  console.log("id", req.query.id);
  console.log("deleteUser is run");

  try {
    if (!req.query.id) {
      res.status(400).json({ message: "Please provide id in query" });
    }
    if (!isValidObjectId(req.query.id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }
    const result = await User.findByIdAndDelete(req.query.id);
    console.log(result);
    if (!result) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted Successfully" });
    }
  } catch (err: any) {
    console.log("error", err);
    res.status(400).json({ message: err.message });
  }
}

async function changePassword(req: any, res: any) {
  console.log("id", req.query.id);
  console.log("changePassword is run");
  console.log(req.body);
  const { userID, oldPassword, newPassword } = req.body;
  try {
    const user: any = await User.findOne({ _id: userID });
    console.log(user);
    // return;
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Old password is incorrect", status: 400 });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Password changed successfully", status: 200 });
  } catch (err: any) {
    console.log("error", err);
    res.status(400).json({ message: err.message, status: 400 });
  }
}

async function getUsersWhoHaveDonePayment(req: any, res: any) {
  try {
    // Assuming the token payload contains the user ID
    const user = await User.find({ isStripePaymentDone: true })
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
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getCaseManagers(req: any, res: any) {
  try {
    // Assuming the token payload contains the user ID
    const user = await User.find({ role: "CASE_MANAGER" }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Case Managers not found" });
    }
    res.json({
      message: "Case Managers fetched successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createCaseManager(req: any, res: any) {
  console.log("req body", req.body);
  // return;
  const { email, password, name, role } = req.body;

  console.log("/register is run");
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Case Manager already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      role,
      name,
    });

    const result = await user.save();
    console.log(result, "result");

    res.status(200).json({
      user: {
        email: user.email,
        id: user._id,
        message: "Case Manager Created successfully",
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function me(req: any, res: any) {
  const decoded = req.user;
  console.log(decoded, "decodedd");
  try {
    const userId = decoded.id; // Assuming the token payload contains the user ID
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User details fetched successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  login,
  register,
  deleteUser,
  editUser,
  changePassword,
  me,
  getUsersWhoHaveDonePayment,
  createCaseManager,
  getCaseManagers,
};
