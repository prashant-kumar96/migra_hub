//@ts-nocheck

import express from "express";
import verifyToken from "../middleware/authenticate.js";
import {
  assignCaseManagerToUser,
  getAllDetailsOfUser,
  getAssignedUsersToCaseManager,
} from "../controllers/caseManager.js";

const router = express.Router();

router.patch("/assignCaseManagerToUser", verifyToken, assignCaseManagerToUser);
router.get(
  "/getAssignedUsersToCaseManager",
  verifyToken,
  getAssignedUsersToCaseManager
);
router.get("/getAllDetailsOfUser", verifyToken, getAllDetailsOfUser);
export default router;
