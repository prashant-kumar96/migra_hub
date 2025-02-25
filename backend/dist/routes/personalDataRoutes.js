//@ts-nocheck
import express from "express";
import verifyToken from "../middleware/authenticate.js";
import { getSinglePersonalData, savePersonalData, updatePersonalData } from "../controllers/personalDataController.js";
const router = express.Router();
router.post("/savePersonalData", verifyToken, savePersonalData);
router.get("/getSinglePersonalData", verifyToken, getSinglePersonalData);
router.put("/updatePersonalData", verifyToken, updatePersonalData);
export default router;
