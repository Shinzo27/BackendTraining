import { Router } from "express";
import { createBlog, deleteBlog, getBlogById, getBlogs, getBlogsByUser, updateBlog } from "../Controllers/Blogs.Controller";
import { checkAdminOrFacultyLoggedIn } from "../Middlewares/auth";
import { upload } from "../Lib/Upload";

const router = Router()

router.get('/', getBlogs)
router.get('/blogById/:id', getBlogById)
router.get('/blogsByUser', getBlogsByUser)
router.post('/', upload.single('coverImage'), checkAdminOrFacultyLoggedIn("faculty"), createBlog)
router.put('/:id', checkAdminOrFacultyLoggedIn("faculty"), updateBlog)
router.delete('/:id', checkAdminOrFacultyLoggedIn("faculty"), deleteBlog)

export default router