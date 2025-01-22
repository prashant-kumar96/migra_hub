//@ts-nocheck
import express from "express";
import verifyToken from "../middleware/authenticate.js";
import { addFamilyMember, deleteFamilyMember, editFamilyMember, getFamilyMemberApplicationDetails, getPrimaryApplicantLinkedFamilyMembers, getSingleFamilyMemberDetails, } from "../controllers/familyMemberController.js";
const router = express.Router();
router.post("/create", verifyToken, addFamilyMember);
router.post("/editFamilyMember", verifyToken, editFamilyMember);
// inside your family controller
router.get("/", getFamilyMemberApplicationDetails);
//inside your family controller
router.get("/linked-family-members/:userId", getPrimaryApplicantLinkedFamilyMembers);
router.get("/singleFamilyMemberDetails", getSingleFamilyMemberDetails);
router.delete("/delete", deleteFamilyMember);
export default router;
