import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  getBlogsByUser,
  updateBlog,
} from "../controllers/blogs";
import { checkAdminOrFacultyLoggedIn } from "../middlewares/auth";
import { upload } from "../lib/upload";

const router = Router();

router.get("/", getBlogs);
router.get("/blogById/:id", getBlogById);
router.get("/blogsByUser", getBlogsByUser);
router.post(
  "/",
  upload.single("coverImage"),
  checkAdminOrFacultyLoggedIn("faculty"),
  createBlog
);
router.put("/:id", checkAdminOrFacultyLoggedIn("faculty"), updateBlog);
router.delete("/:id", checkAdminOrFacultyLoggedIn("faculty"), deleteBlog);

export default router;
