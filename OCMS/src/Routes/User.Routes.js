import { Router } from "express";
import {
  createUser,
  getStudentById,
  deleteStudent,
  updateStudent,
  getUsers,
} from "../Controllers/User.Controller.js";

const router = Router();

//Student
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);
router.put("/:id", updateStudent);

export default router;
