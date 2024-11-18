import express from "express";
import verifyToken from "../middleware/authenticate.js";
import {
  getAdditionalDocuments,
  getSinglePassportData,
  getSingleProofOfFundsData,
  getSingleProofOfTiesData,
  uploadAdditionalDocuments,
  uploadPassportImages,
  uploadProofOfFundsImages,
  uploadProofOfTiesImages,
} from "../controllers/documentController.js";
const router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Set the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb: any) {
    // Accept file types: jpg, jpeg, png
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "/pdf/"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"), false);
    }
  },
});

router.post(
  "/uploadPassportImages",
  upload.array("images", 10),
  uploadPassportImages
);

router.post(
  "/uploadproofOfFundsImages",
  upload.array("images", 10),
  uploadProofOfFundsImages
);
router.post(
  "/uploadProofOfTiesImages",
  upload.array("images", 10),
  uploadProofOfTiesImages
);

router.post(
  "/uploadAdditionalDocuments",
  upload.array("images", 10),
  uploadAdditionalDocuments
);

router.get("/getSinglePassportData", verifyToken, getSinglePassportData);

router.get(
  "/getSingleProofOfFundsData",
  verifyToken,
  getSingleProofOfFundsData
);

router.get("/getSingleProofOfTiesData", verifyToken, getSingleProofOfTiesData);

router.get("/getAdditionalDocuments", verifyToken, getAdditionalDocuments);

export default router;