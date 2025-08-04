import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../Lib/prisma";
import { RESPONSE_MESSAGES } from "../Lib/ResponseMessages";
import { TokenUser } from "../Lib/Types";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const checkAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.cookies["user"] || "";

  if (!userToken)
    return res.json({
      message: RESPONSE_MESSAGES.ERROR.USER.NOT_LOGGEDIN,
    });

  const decodedUser = jwt.verify(userToken, JWT_SECRET) as TokenUser;

  const user = await prisma.user.findFirst({
    where: { email: decodedUser.email },
  });

  if(!user) return res.json({
    message: RESPONSE_MESSAGES.ERROR.USER.NOT_FOUND
  })

  req.user = user

  return next();
};

export const checkAuthorization = (role: "APPLICANT" | "RECRUITER") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || user.role !== role)
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.UNAUTHORIZED,
      });

    return next();
  };
};
