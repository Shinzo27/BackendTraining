import { Request, Response } from "express";
import { ResponseMessages } from "../Lib/ResponseMessage";
import { signInSchema, signUpSchema } from "../Lib/ValidationSchema";
import { UserLogin, UserRegister } from "../Lib/Types";
import { prisma } from "../Lib/prisma";
import { comparePassword, createToken, hashPassword } from "../Lib/Auth";

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
        gr_number: gr_number ? gr_number : "",
        phone,
        address,
        department: department ? department : "",
        roleId: Number(roleId),
        class: className ? className : "",
      },
    });

    return user
      ? res.json({
          success: true,
          message: ResponseMessages.USER.REGISTER,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.WENT_WRONG,
        });
  } catch (error: any) {
    if (error.isJoi) {
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error,
      });
    }
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
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

    if (!user)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.USER.NOT_FOUND,
      });

    const comparePass = await comparePassword(password, user.password);

    if (!comparePass)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.USER.WRONG_PASSWORD,
      });

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

    return res.json({
      success: true,
      message: ResponseMessages.USER.LOGIN,
      user: userPayload,
    });
  } catch (error: any) {
    if (error.isJoi) {
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    }
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("user");

  return res.json({
    success: true,
    message: ResponseMessages.USER.LOGOUT,
  });
};
