import VisaData from "../models/visadata.js";
import { Request, Response } from 'express';
import mongoose from 'mongoose';

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

    res.status(200).json({ data: rest, message: "Visa data found." });

  } catch (err: any) {
        console.error("Error in getSingleVisaData:", err);
         if (err instanceof mongoose.Error.CastError) {
        return res.status(200).json({ data: null, message: `Invalid visaDataId, should be a valid MongoDB ObjectId: ${err.message}`});
        }

    res.status(500).json({ message: "Internal server error" });
  }
};