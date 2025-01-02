//@ts-nocheck

import express from "express";
import verifyToken from "../middleware/authenticate.js";
import { addFamilyMember } from "../controllers/familyMemberController.js";
 
const router = express.Router();

router.post("/create",verifyToken, addFamilyMember);



export default router;
