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
router.put("/approveLeave/:id", approveLeave);
router.get("/getFacultyOfDepartment", getFacultyOfDepartment);
router.get("/getFacultyLeaves", getFacultyLeaves);
router.post("/applyFacultyLeave", applyFacultyLeave);
router.get("/getFacultLeaveBalance", getFacultLeaveBalance);

// Hod
router.get("/getAllLeavesOfHod", getAllLeavesOfHod);
router.put("/approveLeaveHod/:id", approveLeaveHod);

export default router;
