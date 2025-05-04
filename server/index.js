import express from "express";
import path from "path";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

import jobRouter from "./routes/Document/documentRoutes.js";
import authRouter from "./routes/Document/authRoutes.js";
import userRouter from "./routes/Document/userRoutes.js";
import authEmailRouter from "./routes/Email/authRoute.js";
import mailEmailRouter from "./routes/Email/mailDataModel.js";
import saveEmailRouter from "./routes/Email/saveTemplateRoute.js";

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

// API Routes
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth/email", authEmailRouter);
app.use("/api/v1/mail", mailEmailRouter);
app.use("/api/v1/template", saveEmailRouter);

// Error Middleware
app.use(errorHandlerMiddleware);

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
