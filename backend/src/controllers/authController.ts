//@ts-ignore
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import VisaData from "../models/visadata.js";
import ObjectId from "mongoose";
import axios from "axios";
import ApplicationStatus from "../models/applicationStatus.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

export function generateApplicationId() {
  const randomNum = Math.floor(1000 + Math.random() * 90000); // generates a number between 1000-99999
  return `MH${randomNum}`;
}

async function login(req: any, res: any) {
  console.log("login is run");
  try {
    const JWT_SECRET: any = process.env.JWT_SECRET;
    const { email, password } = req.body;
    const user: any = await User.findOne({ email });

    console.log(user);
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

const JWT_SECRET: any = process.env.JWT_SECRET;

async function register(req: any, res: any) {
  console.log("req body", req.body);
  const { email, password, name, role, data } = req.body;

  if (!data) {
    return res.status(400).json({
      message:
        "Please fill all the steps from the index page before registering",
      extraInfo: "Info Incomplete",
    });
  }

  console.log("/register is run");

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const visadata = new VisaData(data);
    const resultVisadata = await visadata.save();
    console.log("resultVisaData", resultVisadata);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userPayload: any = {
      // Define the user payload object
      email,
      password: hashedPassword,
      role,
      name,
      visaDataId: resultVisadata._id,
    };

    // Create application status and application id if role is 'USER'
    if (role === "USER") {
      // const applicationId = uuidv4();
      const applicationId = generateApplicationId();

      const applicationStatus = new ApplicationStatus({
        applicationId: applicationId,
        riskAssessment: "completed",
      });

      await applicationStatus.save();
      userPayload.applicationId = applicationId;
      userPayload.isPrimaryApplicant = true;
    }

    const user = new User(userPayload);

    const result = await user.save();
    console.log(result, "result");

    const token = jwt.sign({ id: result._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      token,
      user: {
        email: result.email,
        id: result._id,
        message: "User registered successfully",
        role: result.role,
      },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function googleLogin(req: any, res: any) {
  const maxRetries = 3; // Set your maximum retry attempts
  let retries = 0;

  while (retries < maxRetries) {
    const session = await mongoose.startSession(); // Start a session for transaction
    session.startTransaction();
    try {
      const { accessToken, email, name, googleId, riskAssessmentData } =
        req.body;
      if (!accessToken || !email || !name || !googleId) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      // Verify Google token
      const googleApiUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`;
      try {
        const googleRes = await axios.get(googleApiUrl);
        if (googleRes.data.email !== email) {
          return res.status(401).json({ message: "Invalid Google token" });
        }
      } catch (err) {
        console.error("Google token verification error:", err);
        return res.status(401).json({ message: "Invalid Google token" });
      }
      // Attempt to find an existing user by email
      let user = await User.findOne({ email }).session(session); // Ensure user lookup is part of transaction
      // Initialize visaDataId and applicationId outside the if blocks
      let visaDataId = user?.visaDataId;
      let applicationId = user?.applicationId;
      // Handle Visa Data (only if riskAssessmentData is present)
      if (riskAssessmentData) {
        if (!visaDataId) {
          const visaData = new VisaData(riskAssessmentData);
          const resultVisaData = await visaData.save({ session });
          visaDataId = resultVisaData._id;
        } else {
          // If visaDataId exists, check if visa data is already saved for that id, if not then update
          const existingVisaData = await VisaData.findById(visaDataId).session(
            session
          );
          if (!existingVisaData) {
            const visaData = new VisaData(riskAssessmentData);
            const resultVisaData = await visaData.save({ session });
            visaDataId = resultVisaData._id;
          } else {
            visaDataId = user.visaDataId;
          }
        }
      }
      // Create or Update User
      if (!user) {
        // applicationId = uuidv4();
        applicationId = generateApplicationId();
        const newUser = new User({
          email,
          name,
          googleId,
          isPrimaryApplicant: true,
          ...(visaDataId && { visaDataId }),
          applicationId: applicationId,
        });
        user = await newUser.save({ session });
      } else {
        if (!user.applicationId) {
          // applicationId = uuidv4();
          applicationId = generateApplicationId();
          user.applicationId = applicationId;
        }
        user.name = name;
        user.googleId = googleId;
        user.isPrimaryApplicant = true;
        if (visaDataId) {
          user.visaDataId = visaDataId;
        }
        await user.save({ session });
      }
      // Handle Application Status (only create if it doesn't exist)
      let applicationStatus = await ApplicationStatus.findOne({
        applicationId: user.applicationId,
      }).session(session);
      if (!applicationStatus) {
        const applicationStatus = new ApplicationStatus({
          applicationId: user.applicationId,
          riskAssessment: riskAssessmentData ? "completed" : "pending",
        });
        await applicationStatus.save({ session });
      } else {
        // Check if visa data has been added or not
        if (riskAssessmentData) {
          applicationStatus.riskAssessment = "completed";
          await applicationStatus.save({ session });
        }
      }
      await session.commitTransaction();
      session.endSession();
      // Generate JWT
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        token,
        user: {
          username: user.name,
          id: user._id,
          role: user.role,
        },
      });
      return; // Exit the loop on successful commit
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();
      if (error.codeName === "WriteConflict" && retries < maxRetries) {
        retries++;
        console.log(
          `Transaction failed due to WriteConflict. Retrying ${retries}/${maxRetries}...`
        );
        await new Promise((resolve) => setTimeout(resolve, 200 * retries)); // Exponential backoff
      } else {
        console.error("Error during Google login:", error);
        res.status(500).json({ message: "Internal server error" });
        return; // Exit the loop on non-retryable error or max retries reached
      }
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
async function getUsersWhoHaveDonePayment(req, res) {
  try {
    const users = await User.find({ isStripePaymentDone: true })
      .select("-password")
      .populate("assignedCaseManagerId");

    console.log("Users from DB:", users);

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with stripe payment done" });
    }

    const usersWithStatus = await Promise.all(
      users.map(async (user) => {
        let status = null;

        if (user?.applicationId) {
          const applicationStatus = await ApplicationStatus.findOne({
            applicationId: user.applicationId,
          });
          status = applicationStatus ? applicationStatus.status : null;
        }

        return {
          ...user.toObject(),
          status: status,
        };
      })
    );

    res.json({
      message: "Users fetched successfully",
      user: usersWithStatus,
    });
  } catch (error) {
    console.error("Error fetching users with status:", error);
    res.status(500).json({ message: "Internal server error", error: error });
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

//@ts-nocheck

async function me(req: Request, res: Response) {
  try {
    //@ts-ignore
    console.log(req.user, "req.user");
    //@ts-ignore
    const decoded = req.user;
    if (!decoded || !decoded.id) {
      console.warn("Unauthorized: No valid user in request.");
      //@ts-ignore
      return res.status(200).json({
        status: false,
        message: "Unauthorized: No valid user in request.",
        user: null,
      });
    }

    const userId = decoded.id;
    const user = await User.findById(userId).select("-password").lean(); // using .lean() for performance
    if (!user) {
      console.warn(`User not found for ID: ${userId}`);
      //@ts-ignore
      return res
        .status(200)
        .json({ status: false, message: "User not found", user: null });
    }

    // If the user has an application ID, find the ApplicationStatus
    let populatedUser = { ...user }; // Create a copy of user
    if (user.applicationId) {
      const applicationStatus2 = await ApplicationStatus.findOne({
        applicationId: user.applicationId,
      });
      console.log("application status 2", applicationStatus2);
      const applicationStatus = await ApplicationStatus.findOne({
        applicationId: user.applicationId,
      })
        .select("status")
        .lean();

      if (applicationStatus) {
        populatedUser = { ...user, status: applicationStatus.status };
      } else {
        populatedUser = { ...user, status: "N/A" };
      }
    } else {
      populatedUser = { ...user, status: "N/A" };
    }

    //@ts-ignore
    res.status(200).json({
      status: true,
      message: "User details fetched successfully",
      user: populatedUser, // Return the populated user
    });
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    //@ts-ignore
    res
      .status(500)
      .json({ status: false, message: "Internal server error", user: null });
  }
}

async function checkifPaymentIsDone(req: any, res: any) {
  try {
    console.log("Checking if payment is done is run");
    // Assuming the token payload contains the user ID
    const user = await User.findOne({ _id: req.query?.userId }).select(
      "-password"
    );
    if (user?.isStripePaymentDone === true) {
      res.status(200).json({
        message: "Stripe payment done",
        status: true,
      });
    } else {
      return res
        .status(200)
        .json({ message: "Stripe payment Not done", status: false });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export {
  login,
  googleLogin,
  register,
  deleteUser,
  editUser,
  changePassword,
  me,
  getUsersWhoHaveDonePayment,
  createCaseManager,
  getCaseManagers,
  checkifPaymentIsDone,
};
