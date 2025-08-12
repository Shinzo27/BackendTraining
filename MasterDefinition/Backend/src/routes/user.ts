import { Router } from "express";
import {
  logout,
  resetPassword,
  sendOtp,
  userLogin,
  userRegister,
} from "../controllers/user";
import { checkAuthorization, checkRegisterUser } from "../middlewares/auth";
import { upload } from "../lib/upload";

const router = Router();

router.post("/signin", userLogin);
router.post("/signup", upload.single("image"), checkRegisterUser, userRegister);
router.get("/logout", logout);
router.post("/sendOtp", checkAuthorization, sendOtp);
router.post("/verifyPassword", resetPassword);

export default router;
