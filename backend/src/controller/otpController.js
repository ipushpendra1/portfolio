import OTP from "../models/otpModel.js";
import { sendOTPEmail } from "../utils/mailSender.js";


// POST /generate-otp
export const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

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
    res.status(500).json({ error: "Could not send OTP" });
  }
};

// POST /verify-otp
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
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
  };
  