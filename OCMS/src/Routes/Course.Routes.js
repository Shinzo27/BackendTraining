import { Router } from "express";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../Controllers/Course.Controller.js";

const router = Router();

router.get('/', getCourses)
router.get('/:id', getCourseById)
router.post('/', createCourse)
router.delete('/:id', deleteCourse)
router.put('/:id', updateCourse)

export default router;
