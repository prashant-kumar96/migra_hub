//@ts-nocheck

import express from "express";
import verifyToken from "../middleware/authenticate.js";
import {
  addFamilyMember,
  deleteFamilyMember,
  getFamilyMemberApplicationDetails,
  getPrimaryApplicantLinkedFamilyMembers,
} from "../controllers/familyMemberController.js";

const router = express.Router();

router.post("/create", verifyToken, addFamilyMember);
// inside your family controller
router.get("/", getFamilyMemberApplicationDetails);
//inside your family controller
router.get(
  "/linked-family-members/:userId",
  getPrimaryApplicantLinkedFamilyMembers
);
router.delete("/delete", deleteFamilyMember);

export default router;
