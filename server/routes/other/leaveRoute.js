import express from "express";
import { createLeave, getLeaves, deleteLeave, updateStatusByHr } from "../../controllers/other/leaveController.js";
import { authenticateUser } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateUser, createLeave);
router.get("/all",authenticateUser, getLeaves);
router.put("/status/:id",authenticateUser, updateStatusByHr);
router.delete("/delete/:id",authenticateUser, deleteLeave);

export default router;
