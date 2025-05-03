import express from "express";
import { getEmailData } from "../../controllers/Email/mailDataController.js";
import { authMiddleware } from "../../middlewares/Email/authMiddleware.js";

const router = express.Router();

router.post("/send-bulk-email",authMiddleware, getEmailData);

export default router;
