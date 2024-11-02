import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User, { IUser } from "../models/User.js";

async function login(req: any, res: any) {
  console.log("login is run");
  const JWT_SECRET: any = process.env.JWT_SECRET;
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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
    res.status(500).json({ message: "Internal server error" });
  }
}

async function register(req: any, res: any) {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  console.log("req body", req.body);
  const { email, password, name, role } = req.body;
  console.log("/register is run");
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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

export { login, register, deleteUser, editUser, changePassword, me };
