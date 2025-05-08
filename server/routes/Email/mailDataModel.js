import express from "express";
import { getEmailData } from "../../controllers/email/mailDataController.js";
import { authenticateUser } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send-bulk-email",authenticateUser, getEmailData);

export default router;
