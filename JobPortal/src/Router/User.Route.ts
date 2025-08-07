import { Router } from "express";
import { getUserProfile, login, register, updateUserProfile } from "../Controllers/User.Controller";
import { checkAuthentication, checkAuthorization } from "../Middlewares/Auth";

const router = Router();

router.post('/signin', login)
router.post('/signup', register)
router.get('/getUserProfile', checkAuthentication, getUserProfile)
router.put('/updateUserProfile', checkAuthentication, updateUserProfile)

export default router   