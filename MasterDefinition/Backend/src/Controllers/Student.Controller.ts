import { Request, Response } from "express";
import { prisma } from "../Lib/prisma";
import { ResponseMessages } from "../Lib/ResponseMessage";
import { success, ZodError } from "zod";
import { leaveSchema } from "../Lib/ZodSchema";
import { checkRequestToUser, getDays } from "../Lib/Checks";

export const getStudentDetails = async (req: Request, res: Response) => {
  const user = req.user?.email;

  const studentDetails = await prisma.user.findFirst({
    where: {
      email: user,
      roleId: 4,
    },
    select: {
      id: true,
      name: true,
      email: true,
      gender: true,
      image: true,
      gr_number: true,
      phone: true,
      address: true,
      department: true,
      class: true,
      roleId: true,
    },
  });

  return studentDetails
    ? res.json({
        success: true,
        message: ResponseMessages.STUDENT.DETAILS_FETCHED,
        details: studentDetails,
      })
    : res.json({
        success: false,
        message: ResponseMessages.ERROR.WENT_WRONG,
      });
};

export const applyStudentLeave = async (req: Request, res: Response) => {
  try {
    leaveSchema.parse(req.body);
    const { startDate, endDate, requestToId, leaveType, reason, status } =
      req.body;

    const isValid = await checkRequestToUser(requestToId);

    if (!isValid)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.STUDENT.NOT_VALID,
      });

    const leave = await prisma.leaveRequest.create({
      data: {
        userId: req.user?.id as string,
        startDate,
        endDate,
        requestToId,
        leaveType,
        reason,
        status,
      },
    });

    return leave
      ? res.json({
          success: true,
          message: ResponseMessages.LEAVE.REQUESTED,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.WENT_WRONG,
        });
  } catch (error) {
    if (error instanceof ZodError)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.issues,
      });
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
    });
  }
};

export const getStudentLeave = async (req: Request, res: Response) => {
  const user = req.user;

  const leaves = await prisma.leaveRequest.findMany({
    where: {
      userId: user?.id,
    },
  });

  return leaves ? res.json({
    success: true,
    message: ResponseMessages.LEAVE.FETCHED,
    leaves
  }) : res.json({
    success: false,
    message: ResponseMessages.ERROR.WENT_WRONG,
  });
};
