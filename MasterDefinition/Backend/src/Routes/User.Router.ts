import { Router } from "express";
import { userLogin, userRegister } from "../Controllers/User.Controller";

const router = Router()

router.post('/signin', userLogin)
router.post('/signup', userRegister)

export default router