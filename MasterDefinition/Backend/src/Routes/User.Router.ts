import { Router } from "express";
import {
  logout,
  userLogin,
  userRegister,
} from "../Controllers/User.Controller";
import { checkRegisterUser } from "../Middlewares/auth";
import { upload } from "../Lib/Upload";

const router = Router();

router.post("/signin", userLogin);
router.post("/signup", upload.single("image"), checkRegisterUser, userRegister);
router.get("/logout", logout);

export default router;
