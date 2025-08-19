import express from "express";
import messageRoutes from "./routes/message.routes.js";
import otpRoutes from "./routes/otpRoutes.js";

const app = express();

app.use(express.json());

// routes
app.use("/", messageRoutes);
app.use("/", otpRoutes);

export default app;
