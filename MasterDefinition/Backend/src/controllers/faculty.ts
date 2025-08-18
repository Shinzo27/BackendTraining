import { Request, Response } from "express";
import { ResponseMessages } from "../lib/responseMessage";
import { prisma } from "../lib/prisma";
import {
  checkRequestToUser,
  checkValidDaysLeave,
  getDays,
} from "../lib/checks";
import { calculateData, getStaticData } from "../lib/calculateService";
import { leaveSchema } from "../lib/validationSchema";

export const getLeaveStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const leaves = await prisma.leaveRequest.findMany({
      where: {
        requestToId: id,
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
      error: error,
    });
  }
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

    if (!leaveDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    const userLeaveDetail = await prisma.userLeave.findFirst({
      where: {
        userId: leaveDetails.userId,
      },
    });

    if (!userLeaveDetail) throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);

    if (userLeaveDetail?.availableLeave === 0)
      throw new Error(ResponseMessages.ERROR.STUDENT.NOT_AVAILABLE_LEAVE);

    const staticData = await getStaticData(leaveDetails.user.department || "");

    const getLeaveDays = await getDays(
      leaveDetails.startDate,
      leaveDetails.endDate
    );

    if (userLeaveDetail.availableLeave - getLeaveDays < 0)
      throw new Error(ResponseMessages.ERROR.STUDENT.NOT_ENOUGH_LEAVE);

    const calculatedData = await calculateData(
      userLeaveDetail,
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

    if (!updateLeaveRequest) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

    const updateLeave = await prisma.userLeave.update({
      where: {
        id: userLeaveDetail.id,
      },
      data: {
        availableLeave: calculatedData.availableLeave,
        usedLeave: calculatedData.usedLeave,
        totalWorkingDays: calculatedData.totalWorkingDays,
        attendancePercentage: calculatedData.attendancePercentage,
      },
    });

    if (!updateLeave) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

    const leaveList = await prisma.leaveRequest.findMany({
      where: {
        requestToId: leaveDetails.requestToId,
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.LEAVE.UPDATED,
      leaves: leaveList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
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
        roleId: 2,
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

export const getFacultyLeaves = async (req: Request, res: Response) => {
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

export const applyFacultyLeave = async (req: Request, res: Response) => {
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
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.STUDENT.NOT_ENOUGH_LEAVE,
      });

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

export const getFacultLeaveBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const getApprovedLeave = await prisma.leaveRequest.count({
      where: {
        userId: id,
        status: "Approved",
      },
    });
    const getLeaveData = await prisma.userLeave.findFirst({
      where: {
        userId: id,
      },
    });
    const requestedToFaculty = await prisma.leaveRequest.count({
      where: {
        requestToId: id,
      },
    });

    const facultyData = {
      approvedLeave: getApprovedLeave,
      availableLeave: getLeaveData?.availableLeave,
      attendancePercentage: getLeaveData?.attendancePercentage,
      studentRequestedTo: requestedToFaculty,
    };

    return res.status(200).json({
      success: true,
      message: ResponseMessages.FACULTY.FETCHED,
      facultyData,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getAllLeavesOfHod = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const hod = await prisma.user.findFirst({
      where: {
        id,
        roleId: 2,
      },
    });

    if (!hod) throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);

    const getFacultyLeaves = await prisma.leaveRequest.findMany({
      where: {
        requestToId: hod.id,
        user: {
          roleId: 3,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    const getStudentLeaves = await prisma.leaveRequest.findMany({
      where: {
        requestToId: hod.id,
        user: {
          roleId: 4,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    const getFacultyList = await prisma.user.findMany({
      where: {
        roleId: 3,
        department: hod.department,
      },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        class: true,
      },
    });

    const getStudentList = await prisma.user.findMany({
      where: {
        roleId: 4,
        department: hod.department,
      },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        class: true,
      },
    });

    const hodData = await getHodData(req, res);

    return res.status(200).json({
      success: true,
      message: ResponseMessages.FACULTY.FETCHED,
      facultyLeaves: getFacultyLeaves,
      studentLeaves: getStudentLeaves,
      studentList: getStudentList,
      facultyList: getFacultyList,
      hodData: hodData,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const approveLeaveHod = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { id: userId } = req.user;

    const leaveDetails = await prisma.leaveRequest.findFirst({
      where: {
        id: Number(id),
        status: "Pending",
      },
      include: {
        user: true,
      },
    });

    if (!leaveDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    const userLeaveDetail = await prisma.userLeave.findFirst({
      where: {
        userId: leaveDetails.userId,
      },
    });

    if (!userLeaveDetail) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    if (status === "Approve" && userLeaveDetail.availableLeave === 0)
      throw new Error(ResponseMessages.ERROR.STUDENT.NOT_AVAILABLE_LEAVE);

    const staticData = await getStaticData(leaveDetails.user.department || "");

    const getLeaveDays = await getDays(
      leaveDetails.startDate,
      leaveDetails.endDate
    );

    if (
      status === "Approve" &&
      userLeaveDetail.availableLeave - getLeaveDays < 0
    )
      throw new Error(ResponseMessages.ERROR.STUDENT.NOT_ENOUGH_LEAVE);

    const calculatedData = await calculateData(
      userLeaveDetail,
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
        id: userLeaveDetail.id,
      },
      data: {
        availableLeave: calculatedData.availableLeave,
        usedLeave: calculatedData.usedLeave,
        totalWorkingDays: calculatedData.totalWorkingDays,
        attendancePercentage: calculatedData.attendancePercentage,
      },
    });

    if (!updateLeave) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

    const getFacultyLeaves = await prisma.leaveRequest.findMany({
      where: {
        requestToId: userId,
        user: {
          roleId: 3,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    const getStudentLeaves = await prisma.leaveRequest.findMany({
      where: {
        requestToId: userId,
        user: {
          roleId: 4,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.LEAVE.UPDATED,
      error: "Hello world",
      studentLeaves: getStudentLeaves,
      facultyLeaves: getFacultyLeaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
    });
  }
};

export const getHodData = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const hod = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!hod) throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);

    const facultyLeaves = await prisma.leaveRequest.count({
      where: {
        requestToId: id,
        user: {
          roleId: 3,
        },
      },
    });

    const studentLeaves = await prisma.leaveRequest.count({
      where: {
        requestToId: id,
        user: {
          roleId: 4,
        },
      },
    });

    const totalStudents = await prisma.user.count({
      where: {
        department: hod.department,
        roleId: 4,
      },
    });

    const totalFaculty = await prisma.user.count({
      where: {
        department: hod.department,
        roleId: 3,
      },
    });

    const data = {
      facultyLeaves,
      studentLeaves,
      totalFaculty,
      totalStudents,
    };

    return data;
  } catch (error: any) {
    return res.status(500).json({
      success: true,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getStudentFacultyOfHod = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const getHodDetails = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!getHodDetails) throw new Error(ResponseMessages.ERROR.UNAUTHORIZE);

    const getFacultyList = await prisma.user.findMany({
      where: {
        roleId: 3,
        department: getHodDetails.department,
      },
    });

    const getStudentList = await prisma.user.findMany({
      where: {
        roleId: 4,
        department: getHodDetails.department,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};
