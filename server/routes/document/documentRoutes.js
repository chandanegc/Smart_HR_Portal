import { Router } from "express";
import { 
    createDocument, 
    createJob, 
    deleteJob, 
    getAllJobs, 
    getJob, 
    getUserDocuments, 
    showStats, 
    updateJob 
} from "../../controllers/document/documentController.js";
import { validateJobInput } from "../../middlewares/validationMiddleware.js";
import { authenticateUser } from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/multerMiddleware.js";

const documentRouter = Router();

documentRouter.route("/")
    .post(authenticateUser, validateJobInput, createJob)
    .get(authenticateUser, getAllJobs);

documentRouter.get("/stats", authenticateUser, showStats);
documentRouter.get("/user-documents/:id", authenticateUser, getUserDocuments);
documentRouter.route("/:id")
    .get(authenticateUser, getJob)
    .delete(authenticateUser, deleteJob)
    .put(authenticateUser, updateJob);

documentRouter.post("/create-document", authenticateUser, upload.single("avatar"), createDocument);

export default documentRouter;