import { Request, Response } from "express";
import { RESPONSE_MESSAGES } from "../Lib/ResponseMessages";
import { ZodError } from "zod";
import { applyJobValidations } from "../Lib/ZodValidations";
import { checkIfRecruitorIsValid, checkIfValid } from "../Lib/Checks";
import { prisma } from "../Lib/prisma";

export const applyJob = async (req: Request, res: Response) => {
  try {
    applyJobValidations.parse(req.body);

    const { JobId, coverLetter } = req.body;

    const isValid = await checkIfValid(JobId, req.user.id);

    if (!isValid)
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.APPLICATIONS.ALREADY_EXISTS,
      });

    const application = await prisma.application.create({
      data: {
        JobId,
        UserId: req.user.id,
        coverLetter,
        status: "PENDING",
      },
    });

    return application
      ? res.json({
          message: RESPONSE_MESSAGES.APPLICATIONS.CREATED,
        })
      : res.json({
          message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
        });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
        error: error.issues,
      });
    }
    return res.json({
      message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
      error,
    });
  }
};

export const getApplicationByUser = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const applications = await prisma.application.findMany({
    where: {
      UserId: userId,
    },
    include: {
      job: {
        select: {
          title: true,
        },
      },
    },
  });

  return res.json({
    message: RESPONSE_MESSAGES.APPLICATIONS.FETCHED,
    applications,
  });
};

export const getApplicationsForAJob = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;

  const job = await prisma.job.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!job)
    return res.json({
      message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
    });

  const isValid = await checkIfRecruitorIsValid(job.companyId, userId);

  if (!isValid)
    return res.json({
      message: RESPONSE_MESSAGES.ERROR.UNAUTHORIZED,
    });

  const getApplications = await prisma.application.findMany({
    where: {
      JobId: Number(id),
    },
    include: {
      job: {
        select: {
          title: true,
        },
      },
    },
  });

  return res.json({
    message: RESPONSE_MESSAGES.APPLICATIONS.FETCHED,
    applications: getApplications,
  });
};
