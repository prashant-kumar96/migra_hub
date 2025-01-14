
//@ts-nocheck
import User from "../models/User.js";
import ObjectId from "mongoose";
import mongoose from "mongoose";
import VisaData from "../models/visadata.js";
import PersonalData from "../models/personalData.js";
import UserDocument from "../models/userDocument.js";
import ApplicationStatus from "../models/applicationStatus.js";

export const assignCaseManagerToUser = async (req: any, res: any) => {
  try {
    console.log("assignCaseManagerToUser started");
     const {applicationId, caseManagerId, userId} = req.body;
    console.log("req.body", req.body);
        
        const result = await User.findByIdAndUpdate(
            { _id: userId },
            { $set: { assignedCaseManagerId: caseManagerId } },
            { new: true }
            ).select("-password");
        console.log("assignCaseManagerToUser result", result);

       const applicationStatus = await ApplicationStatus.findOne({applicationId: applicationId});
       if(applicationStatus){
           // Update the application status to assigned case manager
           await ApplicationStatus.updateOne(
               {_id: applicationStatus._id},
               {$set: { assignedCaseManager: true }}
           );
       }

    if (result) {
      res.status(200).send({ message: "Case Manager assigned successfully" });
    }
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(500).json({ message: "Internal server error", error: err });
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
    })
      .select("-password")
      .lean(); // using .lean() for performance

    if (!users || users.length === 0) {
      return res
        .status(200)
        .json({ message: "No users found", users: [] });
    }
    const populatedUsers = await Promise.all(
      users.map(async (user) => {
          let populatedUser = { ...user }; // Create a copy of user
          if (user.applicationId) {
              const applicationStatus = await ApplicationStatus.findOne({
                applicationId: user.applicationId,
              }).select('status').lean();
            
              if(applicationStatus){
                  populatedUser = { ...user, status: applicationStatus.status };
                }else{
                     populatedUser = { ...user, status: 'N/A' };
                }
          } else{
               populatedUser = { ...user, status: 'N/A' };
          }
        return populatedUser;
      })
    );

    console.log("populatedUsers", populatedUsers);


    res
      .status(200)
      .json({ message: "Users fetched successfully", users: populatedUsers });
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
