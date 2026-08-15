import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticateJwt } from "../../middleware/auth.middleware";

const router = Router();

router.post("/send-otp", AuthController.sendOTP);
router.post("/verify-otp", AuthController.verifyOTP);
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/me", authenticateJwt, AuthController.getMe);

export default router;
