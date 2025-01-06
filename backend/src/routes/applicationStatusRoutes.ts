// routes/application.routes.ts
import express from "express";
import { getApplicationStatusDetails } from "../controllers/applicationStatusController.js";
import verifyToken from "../middleware/authenticate.js";

const router = express.Router();

router.get("/:applicationStatusId", verifyToken, getApplicationStatusDetails);

export default router;