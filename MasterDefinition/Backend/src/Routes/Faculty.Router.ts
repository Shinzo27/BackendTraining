import { Router } from "express";
import {
  approveLeave,
  getLeaveStatus,
} from "../Controllers/Faculty.Controller";
import { checkAdminOrFacultyLoggedIn } from "../Middlewares/auth";

const router = Router();

router.get("/getLeaveStatus", getLeaveStatus);
router.put("/approveLeave/:id", approveLeave);

export default router;
