import { verifyToken } from "../../utils/Email/authUtils.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw error("unauthorized access");
  }

  const tokenData = verifyToken(token);
  const { name, email, _id, email_secret } = tokenData.userId;
  req.user = { name, email, _id, email_secret };
  console.log(req.user);
  next();
};

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};