import { Router } from "express";
import {
  applyFacultyLeave,
  approveLeave,
  getAllLeavesOfHod,
  getFacultLeaveBalance,
  getFacultyLeaves,
  getFacultyOfDepartment,
  getLeaveStatus,
} from "../controllers/faculty";

const router = Router();

router.get("/getLeaveStatus", getLeaveStatus);
router.get("/getFacultyOfDepartment", getFacultyOfDepartment);
router.get("/getFacultyLeaves", getFacultyLeaves);
router.post("/applyFacultyLeave", applyFacultyLeave);
router.get("/getFacultLeaveBalance", getFacultLeaveBalance);
router.put("/approveLeave/:id", approveLeave);
router.get("/getAllLeavesOfHod", getAllLeavesOfHod);

export default router;
