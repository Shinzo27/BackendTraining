import { Request, Response } from "express";
import { roleSchema } from "../lib/validationSchema";
import { prisma } from "../lib/prisma";
import { ResponseMessages } from "../lib/responseMessage";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany({});

    return res.json({
      message: ResponseMessages.ROLE.FETCHED,
      roles,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    await roleSchema.validateAsync(req.body);

    const { name, priority } = req.body;

    const checkIfAlreadyExists = await prisma.role.findFirst({
      where: {
        name,
      },
    });

    if (checkIfAlreadyExists)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.ROLE.ALREADY_EXISTS,
      });

    const role = await prisma.role.create({
      data: {
        name,
        priority,
      },
    });

    return res.json({
      success: true,
      message: ResponseMessages.ROLE.CREATED,
    });
  } catch (error: any) {
    if (error.isJoi)
      return res.status(404).json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
    });
  }
};
