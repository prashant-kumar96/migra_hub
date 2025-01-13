// routes/application.routes.ts
import express from "express";
import { getApplicationStatusDetails,getApplicationDetails,updatePaymentStatus,updateDocumentUploadStatus } from "../controllers/applicationStatusController.js";
import verifyToken from "../middleware/authenticate.js";

const router = express.Router();

router.get("/:applicationId", verifyToken, getApplicationStatusDetails);
router.get("/application-details/:applicationId", verifyToken, getApplicationDetails);


router.post("/document-upload-status/:applicationId", verifyToken, updateDocumentUploadStatus);
router.post("/payment-status/:applicationId", verifyToken, updatePaymentStatus);


export default router;