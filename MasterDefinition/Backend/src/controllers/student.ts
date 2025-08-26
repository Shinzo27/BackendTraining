import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ResponseMessages } from "../lib/responseMessage";
import { leaveSchema } from "../lib/validationSchema";
import { checkRequestToUser, checkValidDaysLeave } from "../lib/checks";

export const applyStudentLeave = async (req: Request, res: Response) => {
  try {
    await leaveSchema.validateAsync(req.body);
    const { id } = req.user;
    const { startDate, endDate, requestToId, leaveType, reason, status } =
      req.body;

    const isValid = await checkRequestToUser(requestToId);

    if (!isValid)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.STUDENT.NOT_VALID,
      });

    const isValidDays = await checkValidDaysLeave(
      id as string,
      startDate,
      endDate
    );

    if (!isValidDays)
      throw new Error(ResponseMessages.ERROR.STUDENT.NOT_ENOUGH_LEAVE);

    const leave = await prisma.leaveRequest.create({
      data: {
        userId: id as string,
        startDate,
        endDate,
        requestToId,
        leaveType,
        reason,
        status,
      },
    });

    if (!leave) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

    const leaveList = await prisma.leaveRequest.findMany({
      where: {
        userId: id as string,
      },
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.LEAVE.REQUESTED,
      leaves: leaveList,
    });
  } catch (error: any) {
    if (error.isJoi) {
      return res.status(404).json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    }
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getStudentLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const leaves = await prisma.leaveRequest.findMany({
      where: {
        userId: id,
      },
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.LEAVE.FETCHED,
      leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
    });
  }
};

export const getStudentLeaveBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const leaveBalance = await prisma.userLeave.findFirst({
      where: {
        userId: id,
      },
    });

    const studentLeave = await prisma.leaveRequest.findMany({
      where: {
        userId: id,
      },
    });

    const approvedLeave = studentLeave.filter(
      (leave) => leave.status === "Approved"
    );
    const rejectedLeave = studentLeave.filter(
      (leave) => leave.status === "Rejected"
    );

    const leaveData = {
      approvedLeave: approvedLeave.length,
      rejectedLeave: rejectedLeave.length,
      availableLeave: leaveBalance?.availableLeave,
      attendancePercentage: leaveBalance?.attendancePercentage,
    };

    return res.status(200).json({
      success: true,
      message: ResponseMessages.STUDENT.LEAVE_BALANCE_FETCHED,
      data: leaveData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
    });
  }
};

export const getFacultyOfDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        department: true,
      },
    });

    if (!user) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    const faculty = await prisma.user.findMany({
      where: {
        department: user.department,
        OR: [
          {
            roleId: 2,
          },
          {
            roleId: 3,
          },
        ],
      },
      select: {
        id: true,
        name: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.FACULTY.FETCHED,
      faculty,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};
