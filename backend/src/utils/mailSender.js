import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      
    },
  });
  

  export async function sendOTPEmail(to, otp) {
    return transporter.sendMail({
      from: `"ipushpendra" <${process.env.EMAIL_USER}>`,
      to,
      subject: "🔐 Your Secure OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
          <h2 style="color: #333;">Hello 👋</h2>
          <p style="font-size: 16px; color: #555;">
            We received a request to verify your email address. Please use the OTP below to complete the process:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 28px; font-weight: bold; color: #2c7be5; letter-spacing: 3px;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #777;">
            ⚠️ This OTP is valid for <b>10 minutes</b>. Please do not share it with anyone.
          </p>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">
            This is an automated message from <b>ipushpendra</b>. If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    });
  }
  
