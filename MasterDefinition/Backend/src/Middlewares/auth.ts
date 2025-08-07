import { NextFunction, Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenUser } from "../Lib/Types";
import { ResponseMessages } from "../Lib/ResponseMessage";
import { checkIfUserExists } from "../Lib/Checks";

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
  const roleId = Number(req.body.roleId);

  const user = req.user;

  if (roleId === 1) {
    return res.json({
      message: ResponseMessages.ERROR.UNAUTHORIZE,
    });
  } else if (roleId === 2 || (roleId === 3 && user)) {
    if (user?.role !== 1) {
      return res.json({
        message: ResponseMessages.ERROR.UNAUTHORIZE,
      });
    }

    const checkIfExists = await checkIfUserExists(req.body.email);
    if (checkIfExists)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.USER.ALREADY_EXISTS,
      });

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
