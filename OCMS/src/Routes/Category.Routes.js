import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../Controllers/Category.Controller.js";

const router = Router();

//Get Categories Route
router.get("/", getCategories);

//Get Category by Id Route
router.get("/:id", getCategoryById);

//Create Category Route
router.post("/", createCategory);

//Update Category Route
router.put("/:id", updateCategory);

//Delete Category Route
router.delete("/:id", deleteCategory);

export default router;
