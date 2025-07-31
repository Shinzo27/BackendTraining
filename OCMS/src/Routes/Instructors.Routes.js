import { Router } from "express";
import {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} from "../Controllers/Instructors.Controller.js";

const router = Router();

router.get("/", getAllInstructors);
router.get("/:id", getInstructorById);
router.post("/", createInstructor);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteInstructor);

export default router;
