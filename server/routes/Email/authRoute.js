import express from 'express';
import { logout, userLogin, userRegister } from '../../controllers/Email/authController.js';

const authRouter = express.Router();

authRouter.post("/login", userLogin);
authRouter.post("/register", userRegister);
authRouter.get("/logout", logout);

export default authRouter;
