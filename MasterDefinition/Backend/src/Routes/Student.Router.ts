import { Router } from "express";
import { applyStudentLeave, getStudentDetails, getStudentLeave, getStudentLeaveBalance } from "../Controllers/Student.Controller";

const router = Router()

router.get('/studentDetails', getStudentDetails)
router.post('/applyStudentLeave', applyStudentLeave)
router.get('/getStudentLeave', getStudentLeave)
router.get('/getLeaveBalance', getStudentLeaveBalance)
export default router