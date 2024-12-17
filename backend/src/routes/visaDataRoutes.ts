//@ts-nocheck

import express from "express";
import verifyToken from "../middleware/authenticate.js";
import { getSingleVisaData } from "../controllers/visaDataController.js";

const router = express.Router();

router.get("/getSinglevisaData", verifyToken, getSingleVisaData);

export default router;
