import { Router } from "express";
import { createStaticData, getLeaveList, getLeaveReport, getStaticData, updateStaticData } from "../Controllers/Admin.Controller";

const router = Router()

router.get('/getLeaveList', getLeaveList)
router.get('/getLeaveReport', getLeaveReport)
router.post('/createStaticData', createStaticData)
router.get('/getStaticData', getStaticData)
router.put('/updateStaticData/:id', updateStaticData)

export default router