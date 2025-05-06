import express from "express";
import { getPdf, uploadPdf } from "../../controllers/other/calendarController.js";
import upload from "../../middlewares/multerMiddleware.js"; // multer upload middleware
import { authenticateUser } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/pdf", authenticateUser, getPdf);
router.post("/upload",authenticateUser, upload.single("pdf"), uploadPdf); // upload the file and handle PDF upload
export default router;
