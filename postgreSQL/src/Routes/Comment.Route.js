import { Router } from "express";
import { addComment } from "../Controllers/Comment.Controller.js";

const router = Router()

router.post('/', addComment)

export default router