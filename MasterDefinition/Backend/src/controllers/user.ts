import { Request, Response } from "express";
import { ResponseMessages } from "../lib/responseMessage";
import { signInSchema, signUpSchema } from "../lib/validationSchema";
import { UserLogin, UserRegister } from "../lib/types";
import { prisma } from "../lib/prisma";
import {
  comparePassword,
  createPasswordResetToken,
  createToken,
  generateOtp,
  generateTempToken,
  hashPassword,
  updatePasswordResetToken,
  verifyHashedOtp,
  verifyToken,
} from "../lib/auth";
import { transporter } from "../lib/transporter";

export const userRegister = async (req: Request, res: Response) => {
  try {
    await signUpSchema.validateAsync(req.body);

    const {
      name,
      email,
      password,
      gender,
      gr_number,
      phone,
      address,
      department,
      roleId,
      className,
    } = req.body as UserRegister;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
        image: req.file?.path || "",
        gr_number: gr_number && gr_number,
        phone,
        address,
        department: department && department,
        roleId: Number(roleId),
        class: className && className,
      },
    });

    if (!user) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

    if (Number(roleId) === 4 || Number(roleId) === 3) {
      const staticData = await prisma.statics.findFirst({
        where: {
          department,
        },
      });

      if (!staticData) throw new Error("Static data not found!");

      const userLeaveData = await prisma.userLeave.create({
        data: {
          userId: user.id,
          totalLeave: staticData.totalLeave,
          availableLeave: staticData.totalLeave,
          usedLeave: 0,
          academicYear: staticData.academicYear,
          totalWorkingDays: staticData?.totalWorkingDays,
          attendancePercentage: 100,
        },
      }); 

      if (userLeaveData)
        return res.status(200).json({
          success: true,
          message: ResponseMessages.USER.REGISTER,
        });
    }
  } catch (error: any) {
    if (error.isJoi) {
      return res.status(404).json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error,
      });
    }
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    await signInSchema.validateAsync(req.body);

    const { email, password } = req.body as UserLogin;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error(ResponseMessages.ERROR.USER.NOT_FOUND);

    const comparePass = await comparePassword(password, user.password);

    if (!comparePass)
      throw new Error(ResponseMessages.ERROR.USER.WRONG_PASSWORD);

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.roleId,
    };

    const token = createToken(user.id, user.name, user.email, user.roleId);
    const date = new Date();

    res.cookie("user", token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });

    // res.header('auth-token', `Bearer ${token}`)

    return res.status(200).json({
      success: true,
      message: ResponseMessages.USER.LOGIN,
      user: userPayload,
      token: token,
    });
  } catch (error: any) {
    if (error.isJoi) {
      return res.status(404).json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    }
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("user");

  return res.status(200).json({
    success: true,
    message: ResponseMessages.USER.LOGOUT,
  });
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const { otp, hashedPassword } = await generateOtp();

    const getUser = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!getUser) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    const checkIfExists = await prisma.passwordResetToken.findFirst({
      where: {
        userId: getUser.id,
      },
    });

    transporter.sendMail(
      {
        from: process.env.ETHEREAL_USER,
        to: email,
        subject: "OTP from Master Definition for reset password!",
        text: `Here is your otp for reset password : ${otp}`,
      },
      (err, info) => {
        if (err) throw new Error(err.message);
      }
    );

    if (!checkIfExists) {
      const createToken = await createPasswordResetToken(
        getUser.id,
        hashedPassword
      );

      if (!createToken) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

      return res.json({
        success: true,
        message: ResponseMessages.USER.OTP_SENT,
      });
    } else {
      const updateToken = await updatePasswordResetToken(
        checkIfExists.id,
        hashedPassword
      );

      if (!updateToken) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

      return res.json({
        success: true,
        message: ResponseMessages.USER.OTP_SENT,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!user) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    const checkIfExists = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!checkIfExists) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    const now = new Date();
    if (now > checkIfExists.expiresAt) {
      throw new Error("Otp got expired! Generate another one!");
    }

    const comparePassword = await verifyHashedOtp(otp, checkIfExists.tokenHash);

    if (!comparePassword)
      throw new Error(ResponseMessages.ERROR.USER.WRONG_OTP);

    const payload = {
      hashToken: checkIfExists.tokenHash,
      userId: user.id,
      expiresAt: checkIfExists.expiresAt,
    };

    const token = await generateTempToken(payload);

    res.cookie("tempToken", token, {
      expires: new Date(now.setMinutes(now.getMinutes() + 10)),
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.USER.OTP_VERIFIED,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["tempToken"];
    if (!token) throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);

    const { password } = req.body;

    const { hashToken, userId, expiresAt } = await verifyToken(token);

    const checkIfExists = await prisma.passwordResetToken.findFirst({
      where: {
        tokenHash: hashToken,
        userId,
      },
    });

    if (!checkIfExists) throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);

    const now = new Date();
    if (now > expiresAt) throw new Error("Otp got expired! Generate new one!");

    const hashedPassword = await hashPassword(password);

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (!updateUser) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.status(200).json({
      success: true,
      message: ResponseMessages.USER.PASSWORD_RESET,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};
