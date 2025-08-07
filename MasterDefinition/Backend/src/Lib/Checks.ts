import { prisma } from "./prisma";

export const checkIfUserExists = async (email: string) => {
  const ifExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return ifExists ? true : false;
};

export const getDays = async (
  startDateString: string,
  endDateString: string
) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const time1 = startDate.getTime();
  const time2 = endDate.getTime();

  const diffInMs = Math.abs(time2 - time1);
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const diffInDays = diffInMs / millisecondsInDay;

  const numberOfDays = Math.floor(diffInDays);

  return numberOfDays + 1;
};

export const checkRequestToUser = async(id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  })

  if(!user) return false;

  return (user.roleId === 2 || user.roleId === 3) ? true : false;
}

export const checkValidDaysLeave = async(userId: string, startDate: string, endDate: string) => {
  const days = await getDays(startDate, endDate)

  const userLeaveDetails = await prisma.userLeave.findFirst({
    where: {
      userId
    }
  })

  if(userLeaveDetails?.availableLeave as number - days < 0) {
    return false
  } else {
    return true
  }
}