import CD from "../../models/document/documentModel.js";
import { comparePassword, hashPassword } from "../../utils/passwordUtils.js";
import { createJWT } from "../../utils/tokenUtils.js";

export const registerEmployee = async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;
s
    const existingUser = await CD.findOne({ employeeId });
    if (existingUser) {
      return res.status(400).json({ msg: "Employee with this ID already exists." });
    }

    const hashedPassword = await hashPassword(password);

    const user = new CD({ employeeId, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ msg: "Employee registered successfully." });
  } catch (error) {
    console.error("Error in employee registration:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

export const loginEmployee = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    const user = await CD.findOne({ employeeId });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials. User not found." });
    }

    const isValidUser = await comparePassword(password, user.password);
    if (!isValidUser) {
      return res.status(400).json({ msg: "Invalid credentials. Incorrect password." });
    }

    const token = createJWT({ userId: user._id });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    return res.status(200).json({ msg: "Login successful.", token });
  } catch (error) {
    console.error("Error in employee login:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};
