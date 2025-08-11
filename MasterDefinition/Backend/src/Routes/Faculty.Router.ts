import { Router } from "express";
import {
  approveLeave,
  getLeaveStatus,
} from "../Controllers/Faculty.Controller";

const router = Router();

router.get("/getLeaveStatus", getLeaveStatus);
router.put("/approveLeave/:id", approveLeave);

export default router;
