import { NextFunction, Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenUser } from "../lib/types";
import { ResponseMessages } from "../lib/responseMessage";
import { checkIfUserExists } from "../lib/checks";

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
  try {
    const { roleId, email } = req.body;
    const user = req.user;

    const checkIfExists = await checkIfUserExists(email);
    if (checkIfExists)
      throw new Error(ResponseMessages.ERROR.USER.ALREADY_EXISTS);

    if (Number(roleId) === 1) {
      throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);
    } else if (Number(roleId) === 2 || (Number(roleId) === 3 && user)) {
      if (user?.role !== 1) throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);
      return next();
    } else if (Number(roleId) === 4) {
      return next();
    } else {
      throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
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

export const checkAdminOrFacultyLoggedIn = (
  role: "admin" | "faculty" | "both"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (role === "admin") {
      if (userRole === 1) {
        return next();
      } else {
        return res.json({
          success: false,
          message: ResponseMessages.ERROR.UNAUTHORIZE,
        });
      }
    } else if (role === "faculty") {
      if (userRole === 2 || userRole === 3) {
        return next();
      } else {
        return res.json({
          success: false,
          message: ResponseMessages.ERROR.UNAUTHORIZE,
        });
      }
    } else if (role === "both") {
      if (userRole === 1 || userRole === 2 || userRole === 3) {
        return next();
      } else {
        return res.json({
          success: false,
          message: ResponseMessages.ERROR.UNAUTHORIZE,
        });
      }
    } else {
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.UNAUTHORIZE,
      });
    }
  };
};
