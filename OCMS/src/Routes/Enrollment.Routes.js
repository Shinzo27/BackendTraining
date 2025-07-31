import { Router } from "express";
import {
  deleteEnrollment,
  getEnrollments,
  postEnrollments,
} from "../Controllers/Enrollment.Controller.js";

const router = Router();

router.get("/", getEnrollments);
router.post("/", postEnrollments);
router.delete("/:id", deleteEnrollment);

export default router;
