import express from "express";
import {
  createTemplate,
  getTemplates,
  deleteTemplate,
} from "../../controllers/email/saveTemplateController.js";
import { authenticateUser } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createTemplate).get("/", authenticateUser, getTemplates);
router.delete("/:id", authenticateUser, deleteTemplate);

export default router;