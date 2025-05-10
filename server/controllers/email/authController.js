import hrModel from "../../models/document/hrModel.js";
import SaveTemplateModel from "../../models/email/saveTemplateModel.js";
import UserModel from "../../models/email/userModel.js";
import { createJWT, verifyJWT } from "../../utils/tokenUtils.js";

export const nodemailerKey = async (req, res) => {
  try {
    const { emailSecret, email } = req.body;

    if (!emailSecret || !email) {
      return res.status(400).json({ msg: "Please provide both email and email secret." });
    }

    const userData = await hrModel.findOne({ email });
    if (!userData) {
      return res.status(404).json({ msg: "Email not found in HR records." });
    }

    let encryptedEmailSecret;
    try {
      encryptedEmailSecret = createJWT({ emailSecret });
    } catch (error) {
      console.error("JWT encryption error:", error.message);
      return res.status(500).json({ msg: "Error encrypting email secret." });
    }

    userData.emailSecret = encryptedEmailSecret;
    await userData.save();

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "No authentication token found." });
    }

    let decodedToken;
    try {
      decodedToken = verifyJWT(token);
    } catch (error) {
      return res.status(401).json({ msg: "Invalid or expired token." });
    }

    // Clean up token payload by removing exp and iat
    const { exp, iat, ...payload } = decodedToken;

    // Add plain emailSecret to new token payload
    const updatedPayload = {
      ...payload,
      emailSecret,
    };

    const newToken = createJWT(updatedPayload);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", newToken, {
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
    });

    const userObject = userData.toObject();
    delete userObject.password;

    return res.status(200).json({
      msg: "Email secret saved and token updated successfully.",
      data: userObject,
    });
  } catch (error) {
    console.error("nodemailerKey error:", error.message);
    return res.status(500).json({ msg: "Server error.", error: error.message });
  }
}
export const deleteUser = async (req, res) => {
  try {
    await SaveTemplateModel.deleteMany({ createdBy: req.user.userId });
    await UserModel.findByIdAndDelete(req.user.userId);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
