import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../../utils/passwordUtils.js";
import Candidate from "../../models/Document/candidateModel.js";
import Hr from "../../models/Document/hrModel.js";
import { UnauthenticatedError } from "../../customError/customError.js";
import { createJWT } from "../../utils/tokenUtils.js";
import {
  generateEmail,
  generateOTP,
  otpMsg,
  sendEmailToEmployee,
} from "../../utils/emailSender.js";
import jwt from "jsonwebtoken";

// Temporary OTP storage
const otpStore = {};

export const sendOtp = async (req, res) => {
  const { email } = req.params;
  try {
    const hrExists = await Hr.findOne({ email });
    if (hrExists) throw new UnauthenticatedError("Email already registered.");

    const otp = generateOTP();
    otpStore[email] = await hashPassword(otp);
    //delete otp 5 min
    setTimeout(() => delete otpStore[email], 300000);

    const emailSubject = `Your TrueDocs OTP – ${otp}`;
    const senderEmail = `"TrueDocs Team" <${process.env.NODEMAILER_USER}>`;
    const message = otpMsg(otp);

    const emailStatus = await sendEmailToEmployee(senderEmail, email, emailSubject, message);
    if (emailStatus) return res.status(StatusCodes.CREATED).json({ msg: "OTP sent to email successfully." });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to send OTP." });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otpStore[email]) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "OTP expired or not found." });

    const isOtpValid = await comparePassword(otp, otpStore[email]);
    if (!isOtpValid) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid OTP." });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    delete otpStore[email];

    return res.json({ msg: "OTP verified successfully.", token });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "OTP verification failed." });
  }
};

export const registerCandidate = async (req, res) => {
  try {
    const { email, employeeId, password, repassword } = req.body;
    const hrId = req.params.id;
    const hr = await Hr.findById(hrId);
    if (!hr) throw new UnauthenticatedError("Access denied. HR not found.");

    if (await Candidate.findOne({ email })) throw new UnauthenticatedError("User already exists.");
    if (password !== repassword) throw new UnauthenticatedError("Passwords do not match.");

    const hashedPassword = await hashPassword(password);
    await Candidate.create({ ...req.body, password: hashedPassword, registeredBy:req.user.userId });

    const emailData = {
      employeeName: "Candidate",
      employeeID: employeeId,
      password,
      companyName: hr.companyName,
      loginLink: `${req.protocol}://${req.get("host")}/login`,
      hrName: hr.name,
      hrEmail: hr.email,
      hrContact: `${hr.companyName}, ${hr.location}`,
    };

    const emailSubject = `Your TrueDocs Credentials – ${hr.companyName}`;
    const senderEmail = `"HR Team - ${hr.companyName}" <${process.env.NODEMAILER_USER}>`;
    const message = generateEmail(emailData);
    const emailStatus = await sendEmailToEmployee(senderEmail, email, emailSubject, message);
    return res.status(StatusCodes.CREATED).json({
      msg: emailStatus ? "Credentials sent to candidate email successfully." : "Failed to send credentials email.",
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Candidate registration failed." });
  }
};

export const registerHR = async (req, res) => {
  try {
    const { email, employeeId, password, repassword } = req.body;
    if (await Hr.findOne({ $or: [{ email }, { employeeId }] })) {
      throw new UnauthenticatedError("HR already exists.");
    }
    if (password !== repassword) throw new UnauthenticatedError("Passwords do not match.");
    await Hr.create({ ...req.body, password: await hashPassword(password) });
    return res.status(StatusCodes.CREATED).json({ msg: "HR registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "HR registration failed." });
  }
};

export const loginCandidate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Candidate.findOne({
      $or: [{ email }, { employeeId: email }]
    });

    const isValid = user && await comparePassword(password, user.password);
    if (!isValid) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Please enter correct credentials." });
    }

    const token = createJWT({ userId: user._id, role: user.role });

    // Cookie options depending on environment
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,            // only send cookie over HTTPS in production
      sameSite: isProduction ? 'strict' : 'lax', // prevent CSRF in production
      maxAge: 60 * 60 * 1000           // 1 hour in milliseconds
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Login successful.", role: user.role, _id: user._id });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Candidate login failed." });
  }
};

export const loginHR = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Hr.findOne({
      $or: [{ email }, { employeeId: email }]
    });

    const isValid = user && await comparePassword(password, user.password);
    if (!isValid) {
      throw new UnauthenticatedError("Invalid credentials.");
    }

    const token = createJWT({ userId: user._id, role: user.role });

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Login successful.", role: user.role, _id: user._id });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "HR login failed." });
  }
};

export const logoutUser = (_, res) => { 
  res.cookie("token", "logout", { httpOnly: true, expires: new Date(Date.now()) });
  return res.status(StatusCodes.OK).json({ msg: "User logged out successfully." });
};
