import OTP from "../models/otpModel.js";
import { sendOTPEmail } from "../utils/mailSender.js";


// POST /generate-otp
export const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Check if email environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing:", {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS
      });
      return res.status(500).json({ error: "Email service not configured" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error generating OTP:", err);
    res.status(500).json({ error: "Could not send OTP", details: err.message });
  }
};

// POST /verify-otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }
    
    const record = await OTP.findOne({ email, otp });
  
    if (!record) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  
    if (record.expiresAt < new Date()) {
      return res.status(400).json({ error: "OTP expired" });
    }
  
    await OTP.deleteOne({ _id: record._id }); // optional cleanup
  
    // ✅ OTP verify ✅
    await sendOTPEmail(email, "Your OTP is verified successfully! 🎉");
  
    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ error: "Could not verify OTP", details: err.message });
  }
};
  