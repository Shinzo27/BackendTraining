import { Router } from "express";
import {
  applyStudentLeave,
  getFacultyOfDepartment,
  getStudentLeave,
  getStudentLeaveBalance,
} from "../controllers/student";
const router = Router();

router.post("/applyStudentLeave", applyStudentLeave);
router.get("/getStudentLeave", getStudentLeave);
router.get("/getLeaveBalance", getStudentLeaveBalance);
router.get("/getFacultyOfDepartment", getFacultyOfDepartment);

export default router;
