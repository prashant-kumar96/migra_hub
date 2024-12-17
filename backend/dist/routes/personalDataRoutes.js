import express from "express";
import verifyToken from "../middleware/authenticate.js";
import { getSinglePersonalData, savePersonalData, } from "../controllers/personalDataController.js";
const router = express.Router();
router.post("/savePersonalData", verifyToken, savePersonalData);
router.get("/getSinglePersonalData", verifyToken, getSinglePersonalData);
export default router;
