import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ResponseMessages } from "../lib/responseMessage";
import { staticDataSchema, updateUserSchema } from "../lib/validationSchema";

// Leave Data
export const getLeaveReport = async (req: Request, res: Response) => {
  try {
    const totalUser = await prisma.user.count({});

    const pendingLeaves = await prisma.leaveRequest.count({
      where: {
        status: "Pending",
      },
    });

    const leaveCount = await prisma.leaveRequest.count();

    const approvalPercentage = await prisma.leaveRequest.count({
      where: {
        status: "Approved",
      },
    });

    const percentage = approvalPercentage
      ? (approvalPercentage * 100) / leaveCount
      : 0;

    const leaveData = {
      totalUser: totalUser,
      pendingLeaves: pendingLeaves,
      approvalPercentage: percentage.toFixed(2),
      totalRequest: leaveCount,
    };

    return res.status(200).json({
      success: true,
      message: ResponseMessages.ADMIN.LEAVEREPORT,
      leaveData: leaveData,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getLeaveReportData = async (req: Request, res: Response) => {
  try {
    const topStudentCount = await prisma.leaveRequest.groupBy({
      by: ["userId"],
      where: {
        user: {
          roleId: 4,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 10,
    });

    const studentDetails = await Promise.all(
      topStudentCount.map(async (user) => {
        const userDetails = await prisma.user.findFirst({
          where: {
            id: user.userId,
          },
          select: {
            id: true,
            name: true,
            department: true,
          },
        });
        return {
          id: userDetails?.id,
          name: userDetails?.name,
          count: user._count.id,
          department: userDetails?.department,
        };
      })
    );

    const topFacultyCount = await prisma.leaveRequest.groupBy({
      by: ["userId"],
      where: {
        user: {
          roleId: 3,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 10,
    });

    const facultyDetails = await Promise.all(
      topFacultyCount.map(async (user) => {
        const userDetails = await prisma.user.findFirst({
          where: {
            id: user.userId,
          },
          select: {
            id: true,
            name: true,
            department: true,
          },
        });
        return {
          id: userDetails?.id,
          name: userDetails?.name,
          count: user._count.id,
          department: userDetails?.department,
        };
      })
    );

    const belowPercentageAttendance = await prisma.userLeave.findMany({
      where: {
        attendancePercentage: {
          lte: 75,
        },
      },
      select: {
        attendancePercentage: true,
        user: {
          select: {
            id: true,
            name: true,
            department: true,
          },
        },
      },
    });

    const pendingLeaves = await prisma.leaveRequest.findMany({
      where: {
        status: "Pending",
      },
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        requestTo: {
          select: {
            name: true,
          },
        },
        reason: true,
      },
    });

    return res.json({
      success: true,
      message: ResponseMessages.LEAVE.FETCHED,
      facultyDetails: facultyDetails,
      studentDetails: studentDetails,
      belowPercentageAttendance: belowPercentageAttendance,
      pendingLeaves: pendingLeaves,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

// User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error(ResponseMessages.ERROR.BAD_REQUEST);

    const deleteUserDetails = await prisma.user.delete({
      where: {
        id,
      },
    });

    const userType = deleteUserDetails.roleId;

    if (!deleteUserDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    const users = await prisma.user.findMany({
      where: {
        roleId: userType,
      },
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.USER.DELETED,
      users: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause,
    });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    await updateUserSchema.validateAsync(req.body);

    const {
      name,
      email,
      gender,
      gr_number,
      phone,
      address,
      department,
      className,
      roleId,
    } = req.body;
    const { id } = req.params;

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        gender,
        gr_number,
        phone,
        address,
        department,
        class: className,
        roleId: Number(roleId),
      },
    });

    if (!updateUser) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.status(200).json({
      success: true,
      message: ResponseMessages.STUDENT.DETAILS_UPDATED,
    });
  } catch (error: any) {
    if (error.isJoi) {
      return res.status(404).json({
        sucess: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    }
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause,
    });
  }
};

export const getUserDataById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error(ResponseMessages.ERROR.BAD_REQUEST);

    const userDetails = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        address: true,
        class: true,
        department: true,
        email: true,
        name: true,
        gender: true,
        id: true,
        phone: true,
        roleId: true,
        gr_number: true,
      },
    });

    if (!userDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.status(200).json({
      success: true,
      message: ResponseMessages.STUDENT.DETAILS_FETCHED,
      data: { ...userDetails, className: userDetails.class },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

// Static Data
export const createStaticData = async (req: Request, res: Response) => {
  try {
    await staticDataSchema.validateAsync(req.body);

    const {
      department,
      className,
      academicYear,
      totalLeave,
      totalWorkingDays,
    } = req.body;

    const staticData = await prisma.statics.create({
      data: {
        department,
        class: className,
        academicYear,
        totalLeave: Number(totalLeave),
        totalWorkingDays: Number(totalWorkingDays),
      },
    });

    if (!staticData) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

    return res.status(200).json({
      success: true,
      message: ResponseMessages.STATICDATA.CREATED,
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
      message: ResponseMessages.ERROR.BAD_REQUEST,
      error: error,
    });
  }
};

export const getStaticData = async (req: Request, res: Response) => {
  try {
    const data = await prisma.statics.findMany({});

    return res.status(200).json({
      success: true,
      message: ResponseMessages.STATICDATA.FETCHED,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
    });
  }
};

export const updateStaticData = async (req: Request, res: Response) => {
  try {
    await staticDataSchema.validateAsync(req.body);

    const { id } = req.params;
    const {
      department,
      className,
      academicYear,
      totalLeave,
      totalWorkingDays,
    } = req.body;

    const updateData = await prisma.statics.update({
      where: {
        id: Number(id),
      },
      data: {
        department,
        class: className,
        academicYear,
        totalLeave: Number(totalLeave),
        totalWorkingDays: Number(totalWorkingDays),
      },
    });

    if (!updateData) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.status(200).json({
      success: true,
      message: ResponseMessages.STATICDATA.UPDATED,
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

export const getStaticDataById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const staticData = await prisma.statics.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!staticData) throw new Error("Data not found!");

    return res.status(200).json({
      success: true,
      message: ResponseMessages.STATICDATA.FETCHED,
      data: { ...staticData, className: staticData.class },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

//Manage Student
export const getStudentList = async (req: Request, res: Response) => {
  try {
    const studentList = await prisma.user.findMany({
      where: {
        roleId: 4,
      },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
      },
    });

    if (!studentList) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.status(200).json({
      success: true,
      message: ResponseMessages.STUDENT.DETAILS_FETCHED,
      data: studentList,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

//Manage HOD
export const getHodDetails = async (req: Request, res: Response) => {
  try {
    const hodDetails = await prisma.user.findMany({
      where: {
        roleId: 2,
      },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.ADMIN.HODDETAILS,
      data: hodDetails,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

// Manage Faculty
export const getFacultyDetails = async (req: Request, res: Response) => {
  try {
    const facultyDetails = await prisma.user.findMany({
      where: {
        roleId: 3,
      },
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: ResponseMessages.FACULTY.FETCHED,
      data: facultyDetails,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};
