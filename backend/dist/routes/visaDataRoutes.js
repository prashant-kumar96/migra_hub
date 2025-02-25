//@ts-nocheck
import express from "express";
import verifyToken from "../middleware/authenticate.js";
import { getSingleVisaData, addVisaData, updateVisaData } from "../controllers/visaDataController.js";
const router = express.Router();
router.get("/getSinglevisaData", verifyToken, getSingleVisaData);
router.post("/create", addVisaData);
router.put("/update", verifyToken, updateVisaData);
export default router;
