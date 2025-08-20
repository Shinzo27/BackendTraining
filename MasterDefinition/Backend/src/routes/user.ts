import { Router } from "express";
import {
  logout,
  resetPassword,
  sendOtp,
  userLogin,
  userRegister,
  verifyOtp,
} from "../controllers/user";
import { checkRegisterUser } from "../middlewares/auth";
import { upload } from "../lib/upload";

const router = Router();

router.post("/signin", userLogin);
router.post("/signup", upload.single("image"), checkRegisterUser, userRegister);
router.get("/logout", logout);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);

export default router;
