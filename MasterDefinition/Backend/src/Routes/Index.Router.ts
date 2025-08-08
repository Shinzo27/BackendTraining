import { Router } from "express";
import userRouter from "../Routes/User.Router";
import roleRouter from "../Routes/Role.Router";
import studentRouter from '../Routes/Student.Router'
import facultyRouter from '../Routes/Faculty.Router'
import adminRouter from '../Routes/Admin.Router'
import blogRouter from '../Routes/Blogs.Router'
import { checkAdminOrFacultyLoggedIn, checkAuthorization } from "../Middlewares/auth";

const router = Router()

router.use("/users", userRouter);
router.use("/role", checkAdminOrFacultyLoggedIn('admin'), roleRouter);
router.use("/student", checkAuthorization, studentRouter)
router.use("/faculty", checkAdminOrFacultyLoggedIn("faculty"), facultyRouter)
router.use("/admin", checkAdminOrFacultyLoggedIn("admin"), adminRouter)
router.use("/blogs", checkAuthorization, blogRouter)

export default router   