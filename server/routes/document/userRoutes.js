import { Router } from "express";
import {
  getAllUsers,
  getApplicationStats,
  getCurrentHR,
  getCurrentUser,
  updateCandidate,
  updateHR,
} from "../../controllers/document/userController.js";
import { authenticateUser } from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/multerMiddleware.js";

const userRouter = Router();

userRouter.get("/current-user", authenticateUser, getCurrentUser);
userRouter.get("/current-hr", authenticateUser, getCurrentHR);
userRouter.get("/all-users", authenticateUser, getAllUsers);

userRouter.get("/admin/app-stats", getApplicationStats);

userRouter.patch(
  "/update-user",
  authenticateUser,
  upload.single("avatar"),
  updateCandidate
);
userRouter.patch(
  "/update-hr",
  authenticateUser,
  upload.single("avatar"),
  updateHR
);

export default userRouter;
