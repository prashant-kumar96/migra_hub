//@ts-nocheck

import PersonalData from "../models/personalData.js";
import ApplicationStatus from "../models/applicationStatus.js";
import User from "../models/User.js";



export const savePersonalData = async (req: any, res: any) => {
  console.log("saveProfileData is run");
  console.log("req.body", req.body);

  try {
      const personalData = new PersonalData(req.body);
      const result = await personalData.save();
      console.log("savePersonalData result", result);
      if(result){
          const userId = req.body.userId;
          const user = await User.findById(userId);
          if(!user){
              return res.status(404).json({ message: "User not found" });
          }
            if(user && user.applicationId){
                await ApplicationStatus.updateOne(
                    {applicationId: user.applicationId},
                    {$set: { profileCompletion: "completed" }}
                )
             }

      }
      res.status(200).json({ message: "Personal Data saved successfully" });
  } catch (err) {
      console.log("ERROr=.>", err);
      res.status(400).json({ message: err });
  }
};


export const getSinglePersonalData = async (req: Request, res: Response) => {
  try {
    const userId = req.query?.userId;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
        data: null
      });
    }

    const result = await PersonalData.findOne({ userId: userId });

    if (result) {
      return res.status(200).json({
        status: true,
        message: "Personal Data fetched successfully",
        data: result
      });
    }

    // If no data found, return 200 with empty data
    return res.status(200).json({
      status: false,
      message: "No personal data found for this user",
      data: null
    });

  } catch (err) {
    console.error("Error fetching personal data:", err);
    return res.status(500).json({
      status: false,
      message: "Error fetching personal data",
      error: err instanceof Error ? err.message : "Unknown error occurred"
    });
  }
};
