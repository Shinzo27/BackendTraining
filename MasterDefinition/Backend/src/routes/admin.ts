import { Router } from "express";
import {
  createStaticData,
  getLeaveList,
  getLeaveReport,
  getStaticData,
  getStaticDataById,
  updateStaticData,
  getStudentList,
  getStudentLeaveDetails,
  updateUserDetails,
  getHodDetails,
  getFacultyDetails,
  deleteUser,
  getUserDataById,
} from "../controllers/admin";
import { userRegister } from "../controllers/user";
import { checkRegisterUser } from "../middlewares/auth";

const router = Router();

//Leave Report List
router.get("/getLeaveList", getLeaveList);
router.get("/getLeaveReport", getLeaveReport);

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
router.get("/getStudentLeaveDetails/:id", getStudentLeaveDetails);

// Manage Hod
router.get("/getHodDetails", getHodDetails);
router.post("/createHod", checkRegisterUser, userRegister);

// Manage Faculty
router.get("/getFacultyDetails", getFacultyDetails);
router.post("/createFaculty", checkRegisterUser, userRegister);

export default router;
