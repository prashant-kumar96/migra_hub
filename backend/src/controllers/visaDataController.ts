import VisaData from "../models/visadata.js";

export const getSingleVisaData = async (req: Request, res: Response) => {
  try {
    console.log("getSingleVisaData is run");
    console.log("req.paramss", req.params);
    const result = await VisaData.findOne({ _id: req.params.visadataid });
    result;
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
