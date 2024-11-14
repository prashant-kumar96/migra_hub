import express from "express";
import verifyToken from "../middleware/authenticate.js";
import { savePersonalData } from "../controllers/personalDataController.js";

const router = express.Router();

router.post("/savePersonalData", verifyToken, savePersonalData);

export default router;
