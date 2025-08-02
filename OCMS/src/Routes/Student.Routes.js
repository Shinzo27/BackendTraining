import { Router } from "express";
import {
  getStudentById,
  deleteStudent,
  updateStudent,
  getStudents,
  createStudent,
} from "../Controllers/Student.Controller.js";

const router = Router();

//Get Student Route
router.get("/", getStudents);

// Create Student Route
router.post("/", createStudent);

// Get Student By Id Route
router.get("/:id", getStudentById);

// Delete Student Route
router.delete("/:id", deleteStudent);

// Update Student Route
router.put("/:id", updateStudent);

export default router;
