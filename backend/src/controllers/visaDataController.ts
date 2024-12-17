//@ts-nocheck

import VisaData from "../models/visadata.js";

export const getSingleVisaData = async (req: Request, res: Response) => {
  try {
    console.log("getSingleVisaData is run");
    console.log("req.paramss", req.query);
    const result = await VisaData.findOne({ _id: req.query.visaDataId });
    console.log("getSingleVisaDataresult", result);
    const { _id, createdAt, updatedAt, __v, ...rest } = result?.toObject();
    console.log("rest", rest);
    res.status(200).json({ data: rest });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};