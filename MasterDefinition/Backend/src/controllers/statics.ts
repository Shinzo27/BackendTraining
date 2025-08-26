import { Request, Response } from "express";
import { ResponseMessages } from "../lib/responseMessage";
import { prisma } from "../lib/prisma";

export const getDepartments = async(req: Request, res: Response) => {
  try {
    const department = await prisma.statics.findMany({
        select: {
            department: true,
        }
    })
    return res.status(200).json({
        success: true,
        message: ResponseMessages.STATICDATA.FETCHED,
        department
    })
  } catch (error: any) {
    return res.status(500).json({
        success: false,
        message: ResponseMessages.ERROR.WENT_WRONG,
        error: error.message
    })
  }
}