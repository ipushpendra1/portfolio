import express from "express";
import cors from "cors";
import messageRoutes from "./routes/message.routes.js";
import otpRoutes from "./routes/otpRoutes.js";

const app = express();

const allowedOrigins = [
  "https://ipushpendra.netlify.app/",
  "http://localhost:5173"
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

// routes
app.use("/", messageRoutes);
app.use("/", otpRoutes);

export default app;
