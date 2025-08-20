import express from "express";
import { generateOtp, verifyOtp } from "../controller/otpController.js";

const router = express.Router();

// Health check for OTP service
router.get("/otp-health", (req, res) => {
  res.json({
    service: "OTP Service",
    status: "running",
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
  });
});

router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);

export default router;
