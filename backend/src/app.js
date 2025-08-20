import express from "express";
import cors from "cors";
import messageRoutes from "./routes/message.routes.js";
import otpRoutes from "./routes/otpRoutes.js";

const app = express();

const allowedOrigins = [
   "http://localhost:5173",
   "https://ipushpendra.netlify.app",
   "https://ipushpendra.netlify.app/"
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Test endpoint for debugging
app.get("/test", (req, res) => {
  res.json({
    message: "Backend is working",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    corsOrigins: allowedOrigins
  });
});

// routes
app.use("/", messageRoutes);
app.use("/", otpRoutes);

export default app;
