import { Router } from "express";
import { 
    loginHR, 
    sendOtp, 
    registerCandidate, 
    registerHR, 
    loginCandidate, 
    logoutUser, 
    verifyOtp 
} from "../controllers/authController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.get("/send-otp/:email", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/candidate/register/:id",authenticateUser, registerCandidate);
authRouter.post("/hr/register", registerHR);
authRouter.post("/candidate/login", loginCandidate);
authRouter.post("/hr/login", loginHR);
authRouter.get("/logout",authenticateUser, logoutUser);

export default authRouter;