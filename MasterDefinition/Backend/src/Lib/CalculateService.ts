import { UserLeaveDetail } from "./Types";
import { prisma } from "./prisma";

export const getStaticData = async(department: string) => {
    const data = await prisma.statics.findFirst({
        where: {
            department
        }
    })

    return data;
}

export const calculateData = async(userLeaveDetail: UserLeaveDetail, days: number, staticWorkingDays: number) => {
    const availableLeave = userLeaveDetail.availableLeave - days
    const usedLeave = userLeaveDetail.usedLeave + days
    const totalWorkingDays = userLeaveDetail.totalWorkingDays - days
    const attendancePercentage = (100 * totalWorkingDays)/staticWorkingDays

    return {
        availableLeave,
        usedLeave,
        totalWorkingDays,
        attendancePercentage
    };
}