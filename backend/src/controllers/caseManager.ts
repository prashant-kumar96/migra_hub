import User from "../models/user.js";
import ObjectId from "mongoose";
import mongoose from "mongoose";
import VisaData from "../models/visadata.js";
import PersonalData from "../models/personalData.js";
import UserDocument from "../models/userDocument.js";

export const assignCaseManagerToUser = async (req: Request, res: Response) => {
  try {
    console.log("assignCaseManagerToUser is run");

    console.log("req.body", req.body);
    const result = await User.findByIdAndUpdate(
      { _id: req.body?.userId },
      { $set: { assignedCaseManagerId: req.body?.caseManagerId } },
      { new: true }
    ).select("-password");

    console.log("assignCaseManagerToUser result", result);

    if (result) {
      res.status(200).send({ message: "Case Manager assigned successfully" });
    }
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(400).json({ message: err });
  }
};

export const getAssignedUsersToCaseManager = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(
      "getAssignedUsersToCaseManager query",
      req.query?.caseManagerId
    );

    const users = await User.find({
      assignedCaseManagerId: new mongoose.Types.ObjectId(
        req.query?.caseManagerId
      ),
    }).select("-password");

    // const users = await User.find();

    console.log("usrs", users);

    if (users.length > 0) {
      res.status(200).json({ message: "Users fetched successfully", users });
    } else {
      res.status(200).json({ message: "No users found", users });
    }
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(400).json({ message: err });
  }
};

export const getAllDetailsOfUser = async (req: Request, res: Response) => {
  try {
    console.log("getAllDetailsOfUser query", req.query?.userId);

    const user = await User.findOne({ _id: req.query?.userId })
      .populate("visaDataId")
      .select("-password");

    // console.log("user getAllDetailsOfUser", user);

    const personalData = await PersonalData.find({
      userId: new mongoose.Types.ObjectId(req.query?.userId),
    });

    const document = await UserDocument.find({
      userId: new mongoose.Types.ObjectId(req.query?.userId),
    });

    // console.log("personalData", personalData);
    // console.log("documents", documents);

    const data = {
      user,
      personalData,
      document,
    };

    console.log("data", data);

    if (data) {
      res.status(200).json({ message: "User Data fetched Successfully", data });
    } else {
      res.status(200).json({ message: "No user Data found" });
    }
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(400).json({ message: err });
  }
};
