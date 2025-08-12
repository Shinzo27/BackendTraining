import { Request, Response } from "express";
import { ResponseMessages } from "../lib/responseMessage";
import { signInSchema, signUpSchema } from "../lib/validationSchema";
import { UserLogin, UserRegister } from "../lib/types";
import { prisma } from "../lib/prisma";
import { comparePassword, createToken, hashPassword } from "../lib/auth";
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

    return res.status(200).json({
      success: true,
      message: ResponseMessages.USER.REGISTER,
    });
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

    res.cookie("user", token, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.header('auth-token', `Bearer ${token}`)

    return res.status(200).json({
      success: true,
      message: ResponseMessages.USER.LOGIN,
      user: userPayload,
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
      error: error.details,
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
    const { email } = req.user;
    const { otp } = req.body;

    transporter.sendMail(
      {
        from: process.env.ETHEREAL_USER,
        to: email,
        subject: "OTP from Master Definition for reset password!",
        text: `Here is your otp for reset password : ${otp}`,
      },
      (err, info) => {
        if (err) throw new Error(err.message);

        if (info)
          return res.status(200).json({
            success: true,
            message: ResponseMessages.USER.OTP_SENT,
          });
      }
    );
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const { password } = req.body;

    const hashedPassword = await hashPassword(password);

    const updateUser = await prisma.user.update({
      where: {
        id,
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
      error: error.meta.cause ? error.meta.cause : error.message,
    });
  }
};
