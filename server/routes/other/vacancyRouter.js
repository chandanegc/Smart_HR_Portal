import express from "express"
import {createJob , getJobs , updateJob , deleteJob, getOneJobById} from "../../controllers/other/vacancyController.js"
import { authenticateUser } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/',authenticateUser, createJob);
router.get('/',authenticateUser, getJobs);
router.get('/:id',authenticateUser, getOneJobById);
router.put('/:id', authenticateUser,updateJob);
router.delete('/:id',authenticateUser, deleteJob);

export default router;
