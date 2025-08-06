import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenUser } from "../Lib/Types";
import { ResponseMessages } from "../Lib/ResponseMessage";

export const checkAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const token = req.headers.authorization || ""
  //   const splitToken = token.split(' ')[1]
  //   console.log(splitToken);

  const userToken = req.cookies["user"];

  if (!userToken) return next();

  const user = jwt.verify(
    userToken,
    process.env.JWT_SECRET as string
  ) as TokenUser;

  req.user = user;
  next();
};

export const checkRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roleId = req.body.roleId;

  const user = req.user;

  if (roleId === 1 || roleId === 2 || (roleId === 3 && user)) {
    if (user?.role !== 1) {
      return res.json({
        message: ResponseMessages.ERROR.UNAUTHORIZE,
      });
    }
    return next();
  } else if (roleId === 4) {
    return next();
  } else {
    return res.json({
      message: ResponseMessages.ERROR.UNAUTHORIZE,
    });
  }
};

export const checkAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    return next();
  } else {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.UNAUTHORIZE,
    });
  }
};

export const checkFacultyLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user)
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.UNAUTHORIZE,
    });

  if (user.role === 2 || user.role === 3) {
    return next();
  } else {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.UNAUTHORIZE,
    });
  }
};
