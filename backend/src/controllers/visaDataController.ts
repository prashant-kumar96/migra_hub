import VisaData from "../models/visadata.js";
import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Import uuid
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import ApplicationStatus from "../models/applicationStatus.js";
import { generateApplicationId } from "./authController.js";
 

export const getSingleVisaData = async (req: Request, res: Response) => { 
  try {
    console.log("getSingleVisaData is run");
    console.log("req.query", req.query);

    const visaDataId = req.query.visaDataId;

      if (!visaDataId) {
      console.warn("Warning: visaDataId is missing from query parameters.");
        return res.status(200).json({ data: null, message: "Visa data id not provided." });
      }
    //@ts-ignore
    if (!mongoose.Types.ObjectId.isValid(visaDataId)) {
        console.warn(`Warning: visaDataId is an invalid format: ${visaDataId}`);
      return res.status(200).json({ data: null, message: "Visa data id is not a valid ObjectId." });
    }


    const result = await VisaData.findOne({ _id: visaDataId });

    if (!result) {
         console.warn(`Visa data not found for id: ${visaDataId}`);
      return res.status(200).json({ data: null, message: "Visa data not found." });
    }
    //@ts-ignore
    const { _id, createdAt, updatedAt, __v, ...rest } = result.toObject();
    console.log("rest", rest);

    res.status(200).json({ data: rest, status : true, message: "Visa data found." });

  } catch (err: any) {
        console.error("Error in getSingleVisaData:", err);
         if (err instanceof mongoose.Error.CastError) {
        return res.status(200).json({ data: null, status: false, message: `Invalid visaDataId, should be a valid MongoDB ObjectId: ${err.message}`});
        }

    res.status(500).json({ message: "Internal server error" });
  }
};


 

export const addVisaData = async (req: any, res: any) => {
  try {
    const { userId } = req.body;
    const visaData = new VisaData(req.body);
    const resultVisaData = await visaData.save();
    console.log("resultVisaData", resultVisaData);

    // Generate ApplicationId only when visa data is created
    // const applicationId = uuidv4();
      const applicationId = generateApplicationId();
       

    // Find the user from the user id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // if user application id already exists, do not create again
    if (user.applicationId) {
      return res.status(400).json({ message: "Application id already exists" });
    }

    let applicationStatus = null; 
    let applicationStatusId = null;

    // **FIX: Check if an ApplicationStatus already exists for this user**
    applicationStatus = await ApplicationStatus.findOne({ userId: user._id });


    if (applicationStatus) {
      applicationStatusId = applicationStatus._id;
    } else {
       // Create new application status if one doesn't exist
      applicationStatus = new ApplicationStatus({ userId: user._id, applicationId: applicationId });
      const resultApplicationStatus = await applicationStatus.save()
      applicationStatusId = resultApplicationStatus._id
    }

     // Update the user object with application id
    user.applicationId = applicationId;
    user.visaDataId = resultVisaData._id;
    user.isPrimaryApplicant = true;
     await user.save();

    // Update the application status to completed
    await ApplicationStatus.updateOne(
        { _id: applicationId },
        { $set: { riskAssessment: "completed" } }
    );


    res.status(201).json({
      message: "Visa data created successfully",
      visaDataId: resultVisaData._id,
      applicationId: applicationId,
    });
  } catch (error) {
    console.error("Error creating visa data:", error);
    res.status(500).json({ message: "Failed to create visa data", error });
  }
};

  




export const updateVisaData = async (req: Request, res: Response) => {
  const { visaDataId, ...updateData } = req.body;

    if (!visaDataId) {
        return res.status(400).json({ message: "Visa data ID is required." });
      }
      try {
          const updatedVisaData = await VisaData.findByIdAndUpdate(
            visaDataId,
            updateData,
            { new: true }
          );
          if (!updatedVisaData) {
            return res.status(404).json({ message: "Visa data not found" });
          }
          res.status(200).json({
            message: "Visa data updated successfully",
            updatedVisaData,
          });
        } catch (error) {
          console.error("Error updating visa data:", error);
          res.status(500).json({ message: "Failed to update visa data", error });
        }
};