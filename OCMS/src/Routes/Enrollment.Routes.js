import { Router } from "express";
import {
  deleteEnrollment,
  getEnrollments,
  postEnrollments,
} from "../Controllers/Enrollment.Controller.js";

const router = Router();

// Get Enrollments Route
router.get("/", getEnrollments);

// Create Enrollment Route
router.post("/", postEnrollments);

// Delete Enrollment Route
router.delete("/:id", deleteEnrollment);

export default router;
