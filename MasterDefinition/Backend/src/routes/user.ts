import { Router } from "express";
import {
  getUserDetails,
  logout,
  resetPassword,
  sendOtp,
  updateUserDetails,
  updateUserImage,
  userLogin,
  userRegister,
  verifyOtp,
} from "../controllers/user";
import { checkRegisterUser } from "../middlewares/auth";
import { upload } from "../lib/upload";

const router = Router();

router.post("/signin", userLogin);
router.post("/signup", upload.single("image"), checkRegisterUser, userRegister);
router.get("/userDetails", getUserDetails);
router.get("/logout", logout);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);
router.put("/updateUserDetails", updateUserDetails);
router.put("/updateImage", upload.single("image"), updateUserImage);

export default router;
