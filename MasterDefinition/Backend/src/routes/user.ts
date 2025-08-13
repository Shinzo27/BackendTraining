import { Router } from "express";
import {
  logout,
  resetPassword,
  sendOtp,
  userLogin,
  userRegister,
  verifyOtp,
} from "../controllers/user";
import { checkAuthorization, checkRegisterUser } from "../middlewares/auth";
import { upload } from "../lib/upload";
import { getFacultyOfDepartment } from "../controllers/student";

const router = Router();

router.post("/signin", userLogin);
router.post("/signup", upload.single("image"), checkRegisterUser, userRegister);
router.get("/logout", logout);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);
router.get("/getFacultyOfDepartment", getFacultyOfDepartment);

export default router;
