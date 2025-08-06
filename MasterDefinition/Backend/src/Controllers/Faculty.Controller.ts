import { Request, Response } from "express";
import { ResponseMessages } from "../Lib/ResponseMessage";

export const getLeaveStatus = async(req: Request, res: Response) => {
    const user = req.user;

    const leaves = await prisma?.leaveRequest.findMany({
        where: {
            requestToId: user?.id
        }
    })

    return leaves ? res.json({
        success: true,
        message: ResponseMessages.LEAVE.FETCHED,
        leaves
    }) : res.json({
        success: false,
        message: ResponseMessages.ERROR.WENT_WRONG
    })
}