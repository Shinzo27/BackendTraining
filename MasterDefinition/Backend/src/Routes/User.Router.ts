import { Router } from "express";
import {
  logout,
  resetPassword,
  sendOtp,
  userLogin,
  userRegister,
} from "../Controllers/User.Controller";
import { checkAuthorization, checkRegisterUser } from "../Middlewares/auth";
import { upload } from "../Lib/Upload";

const router = Router();

router.post("/signin", userLogin);
router.post("/signup", upload.single("image"), checkRegisterUser, userRegister);
router.get("/logout", logout);
router.post("/sendOtp", checkAuthorization, sendOtp);
router.post("/verifyPassword", resetPassword);

export default router;
