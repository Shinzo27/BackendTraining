import { Router } from "express";
import { createJob, deleteJob, getJobs, getJobById } from "../Controllers/Job.Controller";
import { checkAuthentication, checkAuthorization } from "../Middlewares/Auth";

const router = Router();

router.post('/', checkAuthentication, checkAuthorization('RECRUITER'), createJob)
router.get('/:id', checkAuthentication, checkAuthorization('RECRUITER'), getJobById)
router.delete('/:id', checkAuthentication, checkAuthorization('RECRUITER'), deleteJob)
router.get('/', checkAuthentication, getJobs)

export default router;
