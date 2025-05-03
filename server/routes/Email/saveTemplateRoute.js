import express from "express";
import {
  createTemplate,
  getTemplates,
  deleteTemplate,
} from "../../controllers/Email/saveTemplateController.js";
import { authMiddleware } from "../../middlewares/Email/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTemplate).get("/", authMiddleware, getTemplates);
router.delete("/:id", authMiddleware, deleteTemplate);

export default router;