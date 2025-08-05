import { Request, Response } from "express";

export const userLogin = async (req: Request, res: Response) => {
  return res.json({
    message: "User logged in!",
  });
};

export const userRegister = async (req: Request, res: Response) => {
  return res.json({
    message: "User Registered!",
  });
};
