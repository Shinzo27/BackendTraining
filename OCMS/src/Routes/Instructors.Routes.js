import { Router } from "express";
import {
  createInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} from "../Controllers/Instructors.Controller.js";

const router = Router();

// Get Instructors Route
router.get("/", getAllInstructors);

//Get Instructor By Id Route
router.get("/:id", getInstructorById);

//Create Instructor Route
router.post("/", createInstructor);

//Update Instructor Route
router.put("/:id", updateInstructor);

//Delete Instructor Route
router.delete("/:id", deleteInstructor);

export default router;
