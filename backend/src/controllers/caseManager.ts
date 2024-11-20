import User from "../models/user.js";
import ObjectId from "mongoose";
import mongoose from "mongoose";

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
