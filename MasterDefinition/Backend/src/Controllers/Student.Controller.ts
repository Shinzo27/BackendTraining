import { Request, Response } from "express";
import { prisma } from "../Lib/prisma";
import { ResponseMessages } from "../Lib/ResponseMessage";
import { leaveSchema } from "../Lib/ValidationSchema";
import {
  checkRequestToUser,
  checkValidDaysLeave,
  getDays,
} from "../Lib/Checks";

export const getStudentDetails = async (req: Request, res: Response) => {
  try {
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
          message: ResponseMessages.ERROR.NOT_FOUND,
        });
  } catch (error) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
    });
  }
};

export const applyStudentLeave = async (req: Request, res: Response) => {
  try {
    await leaveSchema.validateAsync(req.body);

    const { startDate, endDate, requestToId, leaveType, reason, status } =
      req.body;

    const isValid = await checkRequestToUser(requestToId);

    if (!isValid)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.STUDENT.NOT_VALID,
      });

    const isValidDays = await checkValidDaysLeave(
      req.user?.id as string,
      startDate,
      endDate
    );

    if (!isValidDays)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.STUDENT.NOT_ENOUGH_LEAVE,
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
  } catch (error: any) {
    if (error.isJoi)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
    });
  }
};

export const getStudentLeave = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const leaves = await prisma.leaveRequest.findMany({
      where: {
        userId: user?.id,
      },
    });

    return leaves
      ? res.json({
          success: true,
          message: ResponseMessages.LEAVE.FETCHED,
          leaves,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.WENT_WRONG,
        });
  } catch (error) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
    });
  }
};

export const getStudentLeaveBalance = async (req: Request, res: Response) => {
  try {
    const leaveBalance = await prisma.userLeave.findFirst({
      where: {
        userId: req.user?.id,
      },
    });

    return leaveBalance
      ? res.json({
          success: true,
          message: ResponseMessages.STUDENT.LEAVE_BALANCE_FETCHED,
          data: leaveBalance,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.NOT_FOUND,
        });
  } catch (error) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
    });
  }
};
