import express from "express";
import {
  checkifPaymentIsDone,
  createCaseManager,
  getCaseManagers,
  getUsersWhoHaveDonePayment,
  login,
  me,
  register,
} from "../controllers/authController.js";
import verifyToken from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/getusersWhoHaveDonePayment",
  verifyToken,
  getUsersWhoHaveDonePayment
);

router.get("/getCaseManagers", verifyToken, getCaseManagers);
router.get("/checkifPaymentIsDone", verifyToken, checkifPaymentIsDone);

router.post("/createCaseManager", verifyToken, createCaseManager);

router.get("/me", verifyToken, me);

export default router;
