import { Request, Response } from "express";
import { prisma } from "../Lib/prisma";
import { ResponseMessages } from "../Lib/ResponseMessage";
import { staticDataSchema } from "../Lib/ValidationSchema";

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
                    name: true
                }
            }
        }
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

export const createStaticData = async( req: Request, res: Response ) => {
  try {
    await staticDataSchema.validateAsync(req.body)

    const { department, className, academicYear, totalLeave, totalWorkingDays } = req.body

    const staticData = await prisma.statics.create({
      data: {
        department,
        class: className,
        academicYear,
        totalLeave,
        totalWorkingDays
      }
    })

    return staticData ? res.json({
      success: true,
      message: ResponseMessages.STATICDATA.CREATED
    }) : res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG
    })
  } catch (error: any) {
    if(error.isJoi) {
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details
      })
    } 
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.BAD_REQUEST,
      error: error
    })
  }
}

export const getStaticData = async( req: Request, res: Response) => {
  try {
    const data = await prisma.statics.findMany({})

    return res.json({
      success: true,
      message: ResponseMessages.STATICDATA.FETCHED,
      data: data
    })
  } catch (error) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error
    })
  }
}

export const updateStaticData = async(req: Request, res: Response) => {
  try {
    await staticDataSchema.validateAsync(req.body)

    const { id } = req.params
    const { department, className, academicYear, totalLeave, totalWorkingDays } = req.body

    const updateData = await prisma.statics.update({
      where: {
        id: Number(id)
      },
      data: {
        department,
        class: className,
        academicYear,
        totalLeave,
        totalWorkingDays
      }
    })

    return updateData ? res.json({
      success: true,
      message: ResponseMessages.STATICDATA.UPDATED
    }) : res.json({
      success: false,
      message: ResponseMessages.ERROR.NOT_FOUND
    })
  } catch (error: any) {
    if(error.isJoi) {
      return res.json({
        success: false,
        message: ResponseMessages.ERROR.VALIDATION_ERROR,
        error: error.details
      })
    }
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG
    })
  }
}