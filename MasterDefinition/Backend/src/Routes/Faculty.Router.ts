import { Router } from "express";
import { getLeaveStatus } from "../Controllers/Faculty.Controller";
import { checkFacultyLoggedIn } from "../Middlewares/auth";

const router = Router();

router.get("/getLeaveStatus", checkFacultyLoggedIn, getLeaveStatus);

export default router;
