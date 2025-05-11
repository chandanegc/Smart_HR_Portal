import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
// document routes
import docRouter from "./routes/document/documentRoutes.js";
import authRouter from "./routes/document/authRoutes.js";
import userRouter from "./routes/document/userRoutes.js";
// Email routes
import authEmailRouter from "./routes/email/authRoute.js";
import mailEmailRouter from "./routes/email/mailDataModel.js";
import saveEmailRouter from "./routes/email/saveTemplateRoute.js";
// other routes
import leaveRouter from "./routes/other/leaveRoute.js";
import calendarRouter from "./routes/other/calenderRouter.js";
import vacancyRouter from "./routes/other/vacancyRouter.js"
import chatBotROuter from "./routes/other/chatBotRouter.js"

import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import fs from "fs";

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin:[ "http://localhost:3000","https://smart-hr-portal.onrender.com/"],
  credentials: true               
}));

// API Routes
app.use("/api/v1/jobs", docRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

//EMail Routes
app.use("/api/v1/auth/email", authEmailRouter);
app.use("/api/v1/mail", mailEmailRouter);
app.use("/api/v1/template", saveEmailRouter);

//other Routes
app.use("/api/v1/leave", leaveRouter);
app.use("/api/v1/calendar", calendarRouter);
app.use("/api/v1/vacancy", vacancyRouter);
app.use("/api/v1/ai-chat", chatBotROuter);

// Error Middleware
app.use(errorHandlerMiddleware); 

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Serve static files from client/dist
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// React Router (SPA) fallback
app.get("*", (req, res) => {
  const indexFile = path.join(clientDistPath, "index.html");
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.status(404).send("React app not built. Please run `npm run build` inside /client.");
  }
});

// Start server and connect DB
const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();
