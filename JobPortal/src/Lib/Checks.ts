import { number } from "zod";
import { prisma } from "./prisma.js";

export const checkIfUserValid = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
      role: "RECRUITER",
    },
  });

  return user ? true : false;
};

export const checkIfRecruitorIsValid = async (
  companyId: number,
  userId: number
) => {
  const company = await prisma.company.findFirst({
    where: {
      id: companyId,
      userId: userId,
    },
  });

  return company ? true : false;
};

export const checkCompanyByJobId = async(id: number, userId: number) => {
  const company = await prisma.job.findFirst({
    where: {
      id
    },
    include: {
      company: {
        select: {
          userId: true
        }
      }
    }
  })

  return ( company && company?.company.userId === userId) ? true : false 
}

export const checkJobId = async(id: number) => {
  const job = await prisma.job.findFirst({
    where: {
      id
    }
  })

  return job ? true : false
}