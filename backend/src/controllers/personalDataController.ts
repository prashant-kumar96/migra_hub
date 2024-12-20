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
  console.log('single visa data request', req?.query)
  try {
    const userId = req.query?.userId;
    const result = await PersonalData.findOne({ userId: userId });
    console.log("findSinglePersonalData result", result);

    if (result)
      res.status(200).json({ message: "Personal Data fetched successfully" });
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(400).json({ message: err });
  }
};
