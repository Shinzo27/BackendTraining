import { Request, Response } from "express";
import { prisma } from "../Lib/prisma";
import { ResponseMessages } from "../Lib/ResponseMessage";
import { staticDataSchema, updateUserSchema } from "../Lib/ValidationSchema";

// Leave Data
export const getLeaveList = async (req: Request, res: Response) => {
  try {
    const leaveList = await prisma.leaveRequest.findMany({
      include: {
        requestTo: {
          select: {
            name: true,
          },
        },
      },
    });
    return leaveList
      ? res.json({
          success: true,
          message: ResponseMessages.ADMIN.LEAVELIST,
          data: leaveList,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.NOT_FOUND,
        });
  } catch (error) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
    });
  }
};

export const getLeaveReport = async (req: Request, res: Response) => {
  try {
    const leaveData = await prisma.userLeave.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return leaveData
      ? res.json({
          success: true,
          message: ResponseMessages.ADMIN.LEAVEREPORT,
          data: leaveData,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.NOT_FOUND,
        });
  } catch (error) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error,
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
        totalLeave,
        totalWorkingDays,
      },
    });

    return staticData
      ? res.json({
          success: true,
          message: ResponseMessages.STATICDATA.CREATED,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.WENT_WRONG,
        });
  } catch (error: any) {
    if (error.isJoi) {
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    }
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.BAD_REQUEST,
      error: error,
    });
  }
};

export const getStaticData = async (req: Request, res: Response) => {
  try {
    const data = await prisma.statics.findMany({});

    return res.json({
      success: true,
      message: ResponseMessages.STATICDATA.FETCHED,
      data: data,
    });
  } catch (error) {
    return res.json({
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
        totalLeave,
        totalWorkingDays,
      },
    });

    return updateData
      ? res.json({
          success: true,
          message: ResponseMessages.STATICDATA.UPDATED,
        })
      : res.json({
          success: false,
          message: ResponseMessages.ERROR.NOT_FOUND,
        });
  } catch (error: any) {
    if (error.isJoi) {
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    }
    return res.json({
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

    return res.json({
      success: true,
      message: ResponseMessages.STATICDATA.FETCHED,
      data: staticData,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

//Manage Student
export const getStudentList = async (req: Request, res: Response) => {
  try {
    const { department, className } = req.params;

    if (!department || !className)
      throw new Error(ResponseMessages.ERROR.BAD_REQUEST);

    console.log(department, " || ", className);
    const studentList = await prisma.user.findMany({
      where: {
        department,
        class: className,
        roleId: 4,
      },
    });

    if (!studentList) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.STUDENT.DETAILS_FETCHED,
      data: studentList,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getStudentDetailsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error(ResponseMessages.ERROR.BAD_REQUEST);

    const studentDetails = await prisma.user.findFirst({
      where: {
        id,
        roleId: 4,
      },
    });

    if (!studentDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.STUDENT.DETAILS_FETCHED,
      data: studentDetails,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getStudentLeaveDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error(ResponseMessages.ERROR.BAD_REQUEST);

    const leaveDetails = await prisma.userLeave.findFirst({
      where: {
        userId: id,
      },
    });

    if (!leaveDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.LEAVE.FETCHED,
      leaveDetails: leaveDetails,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const updateStudentDetails = async (req: Request, res: Response) => {
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

    return res.json({
      success: true,
      message: ResponseMessages.STUDENT.DETAILS_UPDATED,
    });
  } catch (error: any) {
    if (error.isJoi) {
      return res.json({
        sucess: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details,
      });
    }
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause,
    });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error(ResponseMessages.ERROR.BAD_REQUEST);

    const deleteStudentDetails = await prisma.user.delete({
      where: {
        id,
        roleId: 4,
      },
    });

    return res.json({
      success: true,
      message: ResponseMessages.STUDENT.DELETED,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause,
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
    });

    if (hodDetails.length === 0)
      throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.ADMIN.HODDETAILS,
      data: hodDetails,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getHodDetailsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hodDetails = await prisma.user.findFirst({
      where: {
        id,
        roleId: 2,
      },
    });

    if (!hodDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.ADMIN.HODDETAILS,
      data: hodDetails,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const updateHodDetails = async (req: Request, res: Response) => {
  try {
    await updateUserSchema.validateAsync(req.body);
    const { id } = req.params;

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

    const updateHod = await prisma.user.update({
      where: {
        id,
        roleId: 2,
      },
      data: {
        name,
        email,
        gender,
        gr_number: gr_number && gr_number,
        phone,
        address,
        department,
        class: className,
        roleId: Number(roleId),
      },
    });

    if (!updateHod) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.HOD.UPDATED,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause,
    });
  }
};

export const deleteHod = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error(ResponseMessages.ERROR.BAD_REQUEST);

    const deleteHodDetails = await prisma.user.delete({
      where: {
        id,
        roleId: 2,
      },
    });

    if (!deleteHodDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.HOD.DELETED,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause,
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
    });

    if (facultyDetails.length === 0)
      throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.FACULTY.FETCHED,
      facultyDetails,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getFacultyDetailsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const facultyDetails = await prisma.user.findFirst({
      where: {
        roleId: 3,
        id,
      },
    });

    if (!facultyDetails) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.FACULTY.FETCHED,
      facultyDetails,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const updateFaculty = async (req: Request, res: Response) => {
  try {
    await updateUserSchema.validateAsync(req.body);

    const { id } = req.params;
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

    const updateData = await prisma.user.update({
      where: {
        id,
        roleId: 3,
      },
      data: {
        name,
        email,
        gender,
        gr_number: gr_number && gr_number,
        phone,
        address,
        department,
        class: className,
        roleId: Number(roleId),
      },
    });

    if (!updateData) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.FACULTY.UPDATED,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause ? error.meta.cause : error.message,
    });
  }
};

export const deleteFaculty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteData = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!deleteData) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.FACULTY.DELETED,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause ? error.meta.cause : error.message,
    });
  }
};

// Manage Employee

export const getEmployeesDetails = async (req: Request, res: Response) => {
  try {
    const employeesData = await prisma.user.findMany({
      where: {
        roleId: 5,
      },
    });

    return res.json({
      success: true,
      message: ResponseMessages.EMPLOYEE.FETCHED,
      data: employeesData,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employeeDetail = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!employeeDetail) throw new Error("Employee not found!");

    return res.json({
      success: true,
      message: ResponseMessages.EMPLOYEE.FETCHED,
      data: employeeDetail,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    await updateUserSchema.validateAsync(req.body);
    const { id } = req.params

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

    const updateData = await prisma.user.update({
      where: {
        id,
        roleId: 5
      },
      data: {
        name,
        email,
        gender,
        gr_number: gr_number && gr_number,
        phone,
        address,
        department,
        class: className,
        roleId: Number(roleId)
      }
    })

    if(!updateData) throw new Error(ResponseMessages.ERROR.BAD_REQUEST)

    return res.json({
      success: true,
      message: ResponseMessages.EMPLOYEE.UPDATED,
    })
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const deleteEmployee = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteData = await prisma.user.delete({
      where: {
        id
      }
    })

    if(!deleteData) throw new Error(ResponseMessages.ERROR.NOT_FOUND)

    return res.json({
      success: true,
      message: ResponseMessages.EMPLOYEE.DELETED,
    })
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.messsage ? error.message : error.meta.cause
    })
  }
} 