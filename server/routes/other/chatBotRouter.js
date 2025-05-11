import express from "express";
import { chatbot } from "../../controllers/other/chatbotController.js";

const router = express.Router();

router.post("/",chatbot);

export default router;