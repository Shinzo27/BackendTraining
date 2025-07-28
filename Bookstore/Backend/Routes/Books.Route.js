import { Router } from "express";
import {
  deleteBooks,
  getBooks,
  sortBooks,
  updateBooks,
} from "../Controllers/Books.Controller.js";

const router = Router();

router.get("/sort/:query", sortBooks);
router.get("/getBooks/:type", getBooks)
router.delete('/deleteBooks/:type', deleteBooks)
router.put('/updateBooks/:type', updateBooks)

export default router;