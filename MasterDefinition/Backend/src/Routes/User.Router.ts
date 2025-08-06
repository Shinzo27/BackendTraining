import { Router } from "express";
import { logout, userLogin, userRegister } from "../Controllers/User.Controller";
import { checkRegisterUser } from "../Middlewares/auth";

const router = Router();

router.post("/signin", userLogin);
router.post("/signup", checkRegisterUser, userRegister);
router.get("/logout", logout)

export default router;
