import { Router } from "express";
import { applyStudentLeave, getStudentDetails, getStudentLeave } from "../Controllers/Student.Controller";
import { checkAuthorization } from "../Middlewares/auth";

const router = Router()

router.get('/studentDetails', checkAuthorization, getStudentDetails)
router.post('/applyStudentLeave', checkAuthorization, applyStudentLeave)
router.get('/getStudentLeave', checkAuthorization, getStudentLeave)

export default router