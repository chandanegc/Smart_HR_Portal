import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.JWT_EXPIRE_TOKEN;

const hashPassword = async (password) => {
  try {
    const salt = await genSalt(11);
    return await hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
export { hashPassword, comparePassword, generateToken, verifyToken };
