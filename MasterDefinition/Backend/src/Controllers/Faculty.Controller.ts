import { Request, Response } from "express";
import { ResponseMessages } from "../Lib/ResponseMessage";
import { prisma } from "../Lib/prisma";
import { getDays } from "../Lib/Checks";
import { calculateData, getStaticData } from "../Lib/CalculateService";
import { UserLeaveDetail } from "../Lib/Types";

export const getLeaveStatus = async (req: Request, res: Response) => {
  const user = req.user;

  const leaves = await prisma.leaveRequest.findMany({
    where: {
      requestToId: user?.id,
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
};

export const approveLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leaveDetails = await prisma.leaveRequest.findFirst({
      where: {
        id: Number(id),
        status: "Pending",
      },
      include: {
        user: true,
      },
    });

    if (!leaveDetails)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.NOT_FOUND,
      });

    const userLeaveDetail = await prisma.userLeave.findFirst({
      where: {
        userId: leaveDetails.userId,
      },
    });

    if (userLeaveDetail?.availableLeave === 0) {
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.STUDENT.NOT_AVAILABLE_LEAVE,
      });
    }

    let newUserLeaveDetails;

    const staticData = await getStaticData(leaveDetails.user.department || "");
    if (!userLeaveDetail) {
      newUserLeaveDetails = await prisma.userLeave.create({
        data: {
          userId: leaveDetails.userId,
          totalLeave: staticData?.totalLeave || 0,
          availableLeave: staticData?.totalLeave || 0,
          usedLeave: 0,
          academicYear: staticData?.academicYear || "",
          totalWorkingDays: staticData?.totalWorkingDays || 0,
          attendancePercentage: 100,
        },
      });
    }

    const getLeaveDays = await getDays(
      leaveDetails.startDate,
      leaveDetails.endDate
    );

    const updatedUserLeaveDetails = userLeaveDetail
      ? userLeaveDetail
      : (newUserLeaveDetails as UserLeaveDetail);

    if (updatedUserLeaveDetails.availableLeave - getLeaveDays < 0)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.STUDENT.NOT_ENOUGH_LEAVE,
      });

    const calculatedData = await calculateData(
      updatedUserLeaveDetails,
      getLeaveDays,
      staticData?.totalWorkingDays as number
    );

    const updateLeaveRequest = await prisma.leaveRequest.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    if (!updateLeaveRequest)
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.WENT_WRONG,
      });

    const updateLeave = await prisma.userLeave.update({
      where: {
        id: updatedUserLeaveDetails.id,
      },
      data: {
        availableLeave: calculatedData.availableLeave,
        usedLeave: calculatedData.usedLeave,
        totalWorkingDays: calculatedData.totalWorkingDays,
        attendancePercentage: calculatedData.attendancePercentage,
      },
    });

    return updateLeave
      ? res.json({
          success: true,
          message: ResponseMessages.LEAVE.UPDATED,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.WENT_WRONG,
        });
  } catch (error) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
    });
  }
};
