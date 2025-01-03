//@ts-nocheck

import express from "express";
import verifyToken from "../middleware/authenticate.js";
import { addFamilyMember,getFamilyMemberApplicationDetails,getPrimaryApplicantLinkedFamilyMembers } from "../controllers/familyMemberController.js";
 
const router = express.Router();

router.post("/create",verifyToken, addFamilyMember);
    // inside your family controller
router.get("/", getFamilyMemberApplicationDetails);
//inside your family controller
router.get("/linked-family-members/:userId", getPrimaryApplicantLinkedFamilyMembers);

export default router;
