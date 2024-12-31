//@ts-nocheck

import PersonalData from "../models/personalData.js";

export const savePersonalData = async (req: Request, res: Response) => {
  console.log("saveProfileData is run");
  console.log("req.body", req.body);

  try {
    const personalData = new PersonalData(req.body);
    const result = await personalData.save();
    console.log("savePersonalData result", result);
    if (result)
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
      status: true,
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
