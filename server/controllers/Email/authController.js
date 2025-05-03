import SaveTemplateModel from "../../models/Email/saveTemplateModel.js";
import UserModel from "../../models/Email/userModel.js";
import { comparePassword, generateToken , hashPassword} from "../../utils/Email/authUtils.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await UserModel.findOne({ email });

    if (!userData) {
      return res.status(404).json({ msg: "Please enter correct email" });
    }

    const isMatch = await comparePassword(password, userData.password);
    if (!isMatch) {
      return res.status(404).json({ msg: "Please enter correct password" });
    }
    const userObject = userData.toObject();
    delete userObject.password;

    const token = generateToken(userObject);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    return res.status(200).json({
      msg: "Login successfully",
      data: userObject,
    });
  } catch (error) {
    console.error("Login Error:", error.message); 
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const userRegister = async (req, res) => {
    try {
      if(!req.body.email_secret || !req.body.email || !req.body.password){
        return res.status(400).json({msg:"Please enter all the fields"});
      }
      const password = await hashPassword(req.body.password);
      const saveData = await UserModel.create({ ...req.body,password });
  
      const userObject = saveData.toObject();
      delete userObject.password;
  
      return res.status(201).json({
        msg: "Registration successful",
        data: userObject,
      });
  
    } catch (error) {
      console.error("Registration Error:", error.message);
      return res.status(500).json({
        msg: "Server error",
        error: error.message,
      });
    }
  };
  
export const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
    });

    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging out' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await SaveTemplateModel.deleteMany({ createdBy: req.user._id });
    await UserModel.findByIdAndDelete(req.user._id);
    res.status(200).json({ msg: "User deleted successfully" });
  }
  catch (error) {
    console.error("Delete User Error:", error.message);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
}
