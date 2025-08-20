import { Router } from "express";
import {
  createStaticData,
  getLeaveReport,
  getStaticData,
  getStaticDataById,
  updateStaticData,
  getStudentList,
  updateUserDetails,
  getHodDetails,
  getFacultyDetails,
  deleteUser,
  getUserDataById,
  getLeaveReportData,
} from "../controllers/admin";

const router = Router();

//Leave Report List
router.get("/getLeaveReport", getLeaveReport);
router.get("/getLeaveReportData", getLeaveReportData);
//User
router.get("/getUserData/:id", getUserDataById);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUserDetails/:id", updateUserDetails);

//Static Data Routes
router.post("/createStaticData", createStaticData);
router.get("/getStaticData", getStaticData);
router.put("/updateStaticData/:id", updateStaticData);
router.get("/getStaticDataById/:id", getStaticDataById);

//Manage Student
router.get("/getStudentDetails", getStudentList);

// Manage Hod
router.get("/getHodDetails", getHodDetails);

// Manage Faculty
router.get("/getFacultyDetails", getFacultyDetails);

export default router;
