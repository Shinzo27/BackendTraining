import { Router } from "express";
import {
  getStudentById,
  deleteStudent,
  updateStudent,
  getStudents,
  createStudent,
} from "../Controllers/Student.Controller.js";

const router = Router();

//Student
router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);
router.put("/:id", updateStudent);

export default router;
