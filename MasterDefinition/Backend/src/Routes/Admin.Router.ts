import { Router } from "express";
import {
  createStaticData,
  getLeaveList,
  getLeaveReport,
  getStaticData,
  getStaticDataById,
  getStudentDetailsById,
  updateStaticData,
  getStudentList,
  getStudentLeaveDetails,
  updateStudentDetails,
  getHodDetails,
  getHodDetailsById,
  updateHodDetails,
  deleteStudent,
  deleteHod,
  getFacultyDetails,
  getFacultyDetailsById,
  updateFaculty,
  deleteFaculty,
  getEmployeesDetails,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../Controllers/Admin.Controller";
import { userRegister } from "../Controllers/User.Controller";
import { checkRegisterUser } from "../Middlewares/auth";

const router = Router();

//Leave Report List
router.get("/getLeaveList", getLeaveList);
router.get("/getLeaveReport", getLeaveReport);

//Static Data Routes
router.post("/createStaticData", createStaticData);
router.get("/getStaticData", getStaticData);
router.put("/updateStaticData/:id", updateStaticData);
router.get("/getStaticDataById/:id", getStaticDataById);

//Manage Student
router.get("/getStudentDetails/:department/:className", getStudentList);
router.get("/getStudentDetailsById/:id", getStudentDetailsById);
router.get("/getStudentLeaveDetails/:id", getStudentLeaveDetails);
router.put("/updateStudentDetails/:id", updateStudentDetails);
router.delete("/deleteStudent/:id", deleteStudent);

// Manage Hod
router.get("/getHodDetails", getHodDetails);
router.get("/getHodDetailsById/:id", getHodDetailsById);
router.post("/createHod", checkRegisterUser, userRegister);
router.put("/updateHod/:id", updateHodDetails);
router.delete("/deleteHod/:id", deleteHod);

// Manage Faculty
router.get("/getFacultyDetails", getFacultyDetails);
router.get("/getFacultyDetailsById", getFacultyDetailsById);
router.post("/createFaculty", checkRegisterUser, userRegister);
router.put("/updateFaculty/:id", updateFaculty);
router.delete("/deleteFaculty/:id", deleteFaculty);

//Manage Employee
router.get("/getEmployeesDetails", getEmployeesDetails);
router.get("/getEmployeeDetailById/:id", getEmployeeById);
router.post("/addEmployee", checkRegisterUser, userRegister);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);

export default router;
