import { Router } from "express";
import userRouter from "./user";
import roleRouter from "./role";
import studentRouter from "./student";
import facultyRouter from "./faculty";
import adminRouter from "./admin";
import blogRouter from "./blogs";
import {
  checkAdminOrFacultyLoggedIn,
  checkAuthorization,
} from "../middlewares/auth";
import staticsRouter from './statics'

const router = Router();

router.use("/users", userRouter);
router.use("/role", checkAdminOrFacultyLoggedIn("admin"), roleRouter);
router.use("/student", checkAuthorization, studentRouter);
router.use("/faculty", checkAdminOrFacultyLoggedIn("faculty"), facultyRouter);
router.use("/admin", checkAdminOrFacultyLoggedIn("admin"), adminRouter);
router.use("/blogs", checkAuthorization, blogRouter);
router.use("/statics", staticsRouter)

export default router;
