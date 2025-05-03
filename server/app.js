import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;
let otpStore = {}; // Temporary store for OTPs, ideally use a database.

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chandanegc@gmail.com", // Replace with your Gmail
    pass: "your-app-password", // Use an app password
  },
});

app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  otpStore[email] = otp;

  const mailOptions = {
    from: "chandanegc@gmail.com",
    to: email,
    subject: "Your OTP Verification Code",
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send OTP");
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(200).send("OTP sent successfully");
    }
  });

  // Clear OTP after 5 minutes
  setTimeout(() => delete otpStore[email], 5 * 60 * 1000);
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; // OTP should be one-time use
    res.status(200).send("OTP verified successfully");
  } else {
    res.status(400).send("Invalid or expired OTP");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
