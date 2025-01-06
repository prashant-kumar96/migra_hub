//@ts-nocheck
import UserDocument from "../models/userDocument.js";
import Passport from "../models/userDocument.js";




export const uploadDocuments = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);

      const { files, documentType, userId } = req.body;

      if (!userId || !documentType || Object.keys(files).length === 0) {
          return res.status(400).json({ message: "User ID, document type, and files are required" });
      }
      
      let updateData = {};
    for (const documentTypeKey in files) {
         const filesArray = files[documentTypeKey]
          const uploadArray:any[] = []
          for(const file of filesArray){
              const {buffer, name, type} = file;
              const bufferData = Buffer.from(buffer);
              // Handle Uploading to a local file system
              const filePath = `./uploads/${Date.now()}-${name}`
              const fileUrl = `${process.env.API_URL}uploads/${Date.now()}-${name}`
              // const filePath = path.join("uploads", `${Date.now()}-${file.name}`)
              // Save the buffer
              console.log("save", filePath);
              require('node:fs').writeFileSync(filePath,bufferData);
                uploadArray.push({
                  path: fileUrl,
                  originalname: name,
                  mimetype: type
                })
          }
          updateData[documentTypeKey] = uploadArray;
      }

      const filter = { userId: userId };
      const update = { $set: updateData };
      const options = {
          returnDocument: "after",
          upsert: true,
      };

    const result = await UserDocument.findOneAndUpdate(filter, update, options);
      if (result) {
          res.status(200).json({
              message: "Files uploaded successfully",
               files: Object.keys(updateData).map(key => updateData[key]),
          });
      } else {
          res.status(404).json({ message: "User document not found" });
      }
  } catch (error) {
      console.error("Error uploading documents:", error);
      res.status(500).json({ message: "Upload failed", error: error });
  }
};



export const uploadPassportImages = async (req: Request, res: Response) => {
  // console.log("req.files", req.files);
  // console.log("req.body", req.body);

  console.log("upload Passport Images", req.body);
  try {
    const fileUrls = req.files.map((file) => ({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${file.filename}`,
    }));

    // Save passport data with passport images in the database.
    const updateData = {
      passportImages: req.files,
    };

    const filter = { userId: req.body.userId }; // Check if the document with the specific userId exists
    const update = {
      $set: updateData, // Update the fields in the document
    };
    const options = {
      returnDocument: "after", // Return the updated document after the operation
      upsert: true, // Create a new document if no match is found
    };
    const result = await UserDocument.findOneAndUpdate(filter, update, options);

    if (result) {
      res
        .status(200)
        .json({status:true, message: "Files uploaded successfully", files: fileUrls });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({status:true, message: "Upload failed" });
  }
};

export const uploadProofOfFundsImages = async (req: Request, res: Response) => {
  try {
    const fileUrls = req.files.map((file) => ({
      url: `${process.env.API_URL}uploads/${file.filename}`,
    }));

    // Save passport data with passport images in the database.
    const updateData = {
      proofOfFundsImages: req.files,
    };

    const filter = { userId: req.body.userId }; // Check if the document with the specific userId exists
    const update = {
      $set: updateData, // Update the fields in the document
    };
    const options = {
      returnDocument: "after", // Return the updated document after the operation
      upsert: true, // Create a new document if no match is found
    };
    const result = await UserDocument.findOneAndUpdate(filter, update, options);

    if (result) {
      res
        .status(200)
        .json({status:true, message: "Files uploaded successfully", files: fileUrls });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({status:true, message: "Upload failed" });
  }
};
export const uploadProofOfTiesImages = async (req: Request, res: Response) => {
  try {
    const fileUrls = req.files.map((file) => ({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${file.filename}`,
    }));

    // Save passport data with passport images in the database.
    const updateData = {
      proofOfTiesImages: req.files,
    };

    const filter = { userId: req.body.userId }; // Check if the document with the specific userId exists
    const update = {
      $set: updateData, // Update the fields in the document
    };
    const options = {
      returnDocument: "after", // Return the updated document after the operation
      upsert: true, // Create a new document if no match is found
    };
    const result = await UserDocument.findOneAndUpdate(filter, update, options);

    if (result) {
      res.status(200).json({
        message: "Proof Of Ties to country uploaded successfully",
        files: fileUrls,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({status:true, message: "Upload failed" });
  }
};

export const uploadAdditionalDocuments = async (
  req: Request,
  res: Response
) => {
  try {
    const fileUrls = req.files.map((file) => ({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${file.filename}`,
    }));

    // Save passport data with passport images in the database.
    const updateData = {
      additionalDocuments: req.files,
    };

    const filter = { userId: req.body.userId }; // Check if the document with the specific userId exists
    const update = {
      $set: updateData, // Update the fields in the document
    };
    const options = {
      returnDocument: "after", // Return the updated document after the operation
      upsert: true, // Create a new document if no match is found
    };
    const result = await UserDocument.findOneAndUpdate(filter, update, options);

    if (result) {
      res.status(200).json({
        message: "Additional Documents uploaded successfully",
        files: fileUrls,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({status:true, message: "Upload failed" });
  }
};

export const getSinglePassportData = async (req: Request, res: Response) => {
  try {
    // console.log("getSinglePassportData is run");
    const userId = req.query?.userId;
    const result = await Passport.findOne({ userId: userId });
    // console.log("find getSinglePassportData result", result);

    if (result?.passportImages.length > 0) {
      res
        .status(200)
        .json({status:true, message: "Passport Data fetched successfully", result });
    } else {
      res.status(404).json({status:true, message: "Passport Data Does Not Exist", result });
    }
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(400).json({status:false, message: err });
  }
};

export const getSingleProofOfFundsData = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req?.query?.userId;
    const result = await UserDocument.findOne({ userId: userId });
    // console.log("find getSinglePassportData result", result);
    if (result?.proofOfFundsImages?.length > 0)
      res
        .status(200)
        .json({status:true, message: "Proof Of Funds Data fetched successfully", result });
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(400).json({status:false, message: err });
  }
};


export const getUploadedDocuments = async (
  req: Request,
  res: Response
) => {
  try {
    console.log('Fetching documents...');
    const userId = req?.query?.userId;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID is required to fetch documents.",
      });
    }

    const result = await UserDocument.findOne({ userId: userId });

    console.log('Found documents:', result);

    if (result?.documents?.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Documents fetched successfully.",
        result,
      });
    }

    // No documents found case
    return res.status(200).json({
      status: false,
      message: "No documents found for the provided user ID.",
    });
  } catch (err) {
    console.error("Error fetching documents:", err);
    return res.status(500).json({
      status: false,
      message: "An error occurred while fetching documents.",
      error: err.message,
    });
  }
};



export const getSingleProofOfTiesData = async (req: Request, res: Response) => {
  try {
    // console.log("getSingleProofOfTiesData is run");
    const userId = req?.query?.userId;
    const result = await UserDocument.findOne({ userId: userId });
    // console.log("find getSinglePassportData result", result);
    if (result?.proofOfTiesImages?.length > 0)
      res.status(200).json({
        status:true,
        message: "Proof Of Ties to country Data fetched successfully",
        result,
      });
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(400).json({status:false, message: err });
  }
};

export const getAdditionalDocuments = async (req: Request, res: Response) => {
  try {
    console.log("getAdditionalDocuments is run");
    const userId = req?.query?.userId;
    const result = await UserDocument.findOne({ userId: userId });
    // console.log("find getSinglePassportData result", result);
    if (result?.additionalDocuments?.length > 0) {
      res.status(200).json({
        status:true,
        message: "Additional Documents Data fetched successfully",
        result,
      });
    } else {
      res.status(404).json({
        message: "Additional Documents Not Found",
        // result,
      });
    }
  } catch (err) {
    console.log("ERROr=.>", err);
    res.status(400).json({status:false, message: err });
  }
};
