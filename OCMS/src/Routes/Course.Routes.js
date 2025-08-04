import { Router } from "express";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../Controllers/Course.Controller.js";

const router = Router();

// Get Category Route
router.get('/', getCourses)

// Get Category By Id Route
router.get('/:id', getCourseById)

// Create Category Route
router.post('/', createCourse)

// Delete Category Route
router.delete('/:id', deleteCourse)

// Update Category Route
router.put('/:id', updateCourse)

export default router;
