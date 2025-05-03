import "express-async-errors";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
// Document Routes
import jobRouter from "./routes/Document/documentRoutes.js";
import authRouter from "./routes/Document/authRoutes.js";
import userRouter from "./routes/Document/userRoutes.js";

// Email Routes
import authEmailRouter from "./routes/Email/authRoute.js";
import mailEmailRouter from "./routes/Email/mailDataModel.js";
import saveEmailRouter from "./routes/Email/saveTemplateRoute.js";


import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { fileURLToPath } from "url";  

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

//Document Routes
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

//Email Routes
app.use("/api/v1/auth/email", authEmailRouter);
app.use("/api/v1/mail", mailEmailRouter);
app.use("/api/v1/template", saveEmailRouter);

app.use(errorHandlerMiddleware);

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Serve frontend AFTER defining API routes
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start Server & Connect to MongoDB
// process.env.NODE_ENV === "development"
//         ? process.env.LOCAL_DB_URL
//         : 
const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL
    );
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
