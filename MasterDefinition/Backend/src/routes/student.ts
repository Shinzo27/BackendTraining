import { Router } from "express";
import {
  applyStudentLeave,
  getFacultyOfDepartment,
  getStudentDetails,
  getStudentLeave,
  getStudentLeaveBalance,
} from "../controllers/student";
const router = Router();

router.get("/studentDetails", getStudentDetails);
router.post("/applyStudentLeave", applyStudentLeave);
router.get("/getStudentLeave", getStudentLeave);
router.get("/getLeaveBalance", getStudentLeaveBalance);


export default router;
