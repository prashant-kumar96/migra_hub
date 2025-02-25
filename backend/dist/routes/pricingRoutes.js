// routes/pricing.routes.ts
import express from "express";
import { getApplicationCharges, getPricingData } from "../controllers/pricingController.js";
const router = express.Router();
router.get("/", getPricingData);
router.get("/application-charges/:userId", getApplicationCharges);
export default router;
// j
