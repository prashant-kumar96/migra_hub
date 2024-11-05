import express from "express";
import { login, me, register } from "../controllers/authController.js";
import verifyToken from "../middleware/authenticate.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, me);
export default router;
