import { Router } from "express";
import { applyJob, getApplicationByUser, getApplicationsForAJob } from "../Controllers/Application.Controller";
import { checkAuthentication, checkAuthorization } from "../Middlewares/Auth";

const router = Router()

router.post('/', checkAuthentication, checkAuthorization('APPLICANT'), applyJob)
router.get('/getApplicationByUser', checkAuthentication, checkAuthorization('APPLICANT'), getApplicationByUser)
router.get('/getApplicationsForAJob/:id', checkAuthentication, checkAuthorization('RECRUITER'), getApplicationsForAJob)

export default router