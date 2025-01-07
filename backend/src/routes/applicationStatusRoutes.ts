// routes/application.routes.ts
import express from "express";
import { getApplicationStatusDetails,updateDocumentUploadStatus } from "../controllers/applicationStatusController.js";
import verifyToken from "../middleware/authenticate.js";

const router = express.Router();

router.get("/:applicationStatusId", verifyToken, getApplicationStatusDetails);


router.post("/document-upload-status/:applicationStatusId", verifyToken, updateDocumentUploadStatus);
router.post("/payment-status/:applicationStatusId", verifyToken, updateDocumentUploadStatus);


export default router;