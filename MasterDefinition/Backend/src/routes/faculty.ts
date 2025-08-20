import { Router } from "express";
import {
  applyFacultyLeave,
  approveLeave,
  approveLeaveHod,
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

// Hod
router.get("/getAllLeavesOfHod", getAllLeavesOfHod);
router.put("/approveLeave/:id", approveLeaveHod);

export default router;
