import { Router } from "express";
import {
  applyJob,
  getApplicationByUser,
  getApplicationsForAJob,
} from "../Controllers/Application.Controller";
import { checkAuthorization } from "../Middlewares/Auth";

const router = Router();

router.post("/", checkAuthorization("APPLICANT"), applyJob);
router.get(
  "/getApplicationByUser",
  checkAuthorization("APPLICANT"),
  getApplicationByUser
);
router.get(
  "/getApplicationsForAJob/:id",
  checkAuthorization("RECRUITER"),
  getApplicationsForAJob
);

export default router;
