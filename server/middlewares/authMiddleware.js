import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../customError/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }
  try {
    const { userId, role, emailSecret, email, hrName } = verifyJWT(token);
    if (role !== "admin" && role !== "candidate" && role !== "hr") {
      throw new UnauthenticatedError("authentication invalid");
    } else if (role === "hr" || role === "admin") {
      req.user = { userId, role, email, emailSecret };
      return next();
    }
    req.user = { userId, role, email, hrName };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
