import { Router } from "express";
import { createJob, deleteJob, getJobs, getJobById } from "../Controllers/Job.Controller";
import { checkAuthentication, checkAuthorization } from "../Middlewares/Auth";

const router = Router();

router.post('/', checkAuthorization('RECRUITER'), createJob)
router.get('/:id', checkAuthorization('RECRUITER'), getJobById)
router.delete('/:id', checkAuthorization('RECRUITER'), deleteJob)
router.get('/', getJobs)

export default router;
