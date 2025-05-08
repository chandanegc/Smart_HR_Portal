import express from 'express';
import { nodemailerKey} from '../../controllers/email/authController.js';
import {authenticateUser}from "../../middlewares/authMiddleware.js"
const authRouter = express.Router();

authRouter.post("/login",authenticateUser, nodemailerKey);

export default authRouter;
