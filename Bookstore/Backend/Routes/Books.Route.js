import { Router } from "express";
import {
  deleteBooks,
  getAllBooks,
  sortAllBooks,
  updateBooks,
} from "../Controllers/Books.Controller.js";

const router = Router();

router.get("/sort/:query", sortAllBooks);
router.get("/getBooks/:type", getAllBooks)
router.delete('/deleteBooks/:type', deleteBooks)
router.put('/updateBooks/:type', updateBooks)

export default router;