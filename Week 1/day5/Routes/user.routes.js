import { Router } from "express";
import { login } from "../Controllers/user.controller.js";

const router = Router()

router.post('/login', login)

export default router