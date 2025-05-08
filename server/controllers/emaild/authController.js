import hrModel from "../../models/document/hrModel.js";
import SaveTemplateModel from "../../models/email/saveTemplateModel.js";
import UserModel from "../../models/email/userModel.js";
import { createJWT, verifyJWT } from "../../utils/tokenUtils.js";

export const nodemailerKey = async (req, res) => {
  try {
    const { emailSecret, email } = req.body;

    if (!emailSecret || !email) {
      return res.status(400).json({ msg: "Please enter email and email secret" });
    }

    const userData = await hrModel.findOne({ email });
    if (!userData) {
      return res.status(404).json({ msg: "Please enter correct email" });
    }

    // Encrypt emailSecret using JWT
    let encryptedEmailSecret;
    try {
      encryptedEmailSecret = createJWT({ emailSecret }); // wrap in object
    } catch (error) {
      console.error("Error creating JWT:", error.message);
      return res.status(500).json({ msg: "Server error", error: error.message });
    }

    // Save encrypted emailSecret to DB
    userData.emailSecret = encryptedEmailSecret;
    await userData.save();

    // Decode and verify existing token
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "No authentication token found" });
    }

    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    // Remove exp and iat to avoid conflict
    const { exp, iat, ...cleanedPayload } = decoded;

    // Add plain emailSecret to token payload (optional and depends on your use case)
    const updatedPayload = {
      ...cleanedPayload,
      emailSecret,
    };

    const newToken = createJWT(updatedPayload);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie("token", newToken, {
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
    });

    const userObject = userData.toObject();
    delete userObject.password;

    return res.status(200).json({
      msg: "Email Secret added successfully",
      data: userObject,
    });

  } catch (error) {
    console.error("Email Secret Error:", error.message);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

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
