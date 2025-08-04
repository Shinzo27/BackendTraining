import { Router } from "express";
import { deleteBooks, getBooks, sortBooks, updateBooks } from "../Controllers/Books.controller.js";

const router = Router()

router.get('/getBooks/:type', getBooks)
router.get("/sort/:query", sortBooks);
router.put('/updateBooks/:type', updateBooks)
router.delete('/deleteBooks/:type', deleteBooks)

export default router