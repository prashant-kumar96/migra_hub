import express from "express";
import { checkifPaymentIsDone, createCaseManager, getCaseManagers, getUsersWhoHaveDonePayment, googleLogin, login, me, register, } from "../controllers/authController.js";
import verifyToken from "../middleware/authenticate.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post('/google-login', googleLogin);
router.get("/getusersWhoHaveDonePayment", verifyToken, getUsersWhoHaveDonePayment);
router.get("/getCaseManagers", verifyToken, getCaseManagers);
router.get("/checkifPaymentIsDone", verifyToken, checkifPaymentIsDone);
router.post("/createCaseManager", verifyToken, createCaseManager);
//@ts-ignore
router.get("/me", verifyToken, me);
export default router;
