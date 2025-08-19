import express from "express";
import messageRoutes from "./src/routes/message.routes.js";
import otpRoutes from "./src/routes/otpRoutes.js";

const app = express();

app.use(express.json());

// routes
app.use("/", messageRoutes);
app.use("/", otpRoutes);

export default app;
