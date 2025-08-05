import { Request, Response } from "express";
import { ZodError } from "zod";
import { RESPONSE_MESSAGES } from "../Lib/ResponseMessages";
import { createJobValidation } from "../Lib/ZodValidations";
import { checkCompanyByJobId, checkIfRecruitorIsValid } from "../Lib/Checks";
import { prisma } from "../Lib/prisma";

export const createJob = async (req: Request, res: Response) => {
  try {
    createJobValidation.parse(req.body);

    const { title, description, location, salaryMax, salaryMin, companyId } =
      req.body;

    const isValid = await checkIfRecruitorIsValid(companyId, req.user.id);

    if (!isValid)
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.JOBS.NOT_VALID,
      });

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        salaryMax,
        salaryMin,
        companyId,
      },
    });

    return job
      ? res.json({
          message: RESPONSE_MESSAGES.JOB.CREATED,
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
      error: error,
    });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(Number(id)))
    return res.json({
      message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
    });

  const job = await prisma.job.findMany({
    where: {
      id: Number(id),
    },
    include: {
      company: {
        select: {
          name: true,
          industry: true,
        },
      },
    },
  });

  return job
    ? res.json({
        message: RESPONSE_MESSAGES.JOB.FETCHED,
        job,
      })
    : res.json({
        message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
      });
};

export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(Number(id)))
    return res.json({
      message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
    });

  const isValid = await checkCompanyByJobId(Number(id), req.user.id);

  if (!isValid)
    return res.json({
      message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
    });

  const job = await prisma.job.delete({
    where: {
      id: Number(id),
    },
  });

  return job
    ? res.json({
        message: RESPONSE_MESSAGES.JOB.DELETED,
      })
    : res.json({
        message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
      });
};

export const getJobs = async (req: Request, res: Response) => {
  const { search, limit, offset, filterBy, location, salaryMin, salaryMax } =
    req.query;

  const page = Number(offset) || 1;
  const pageSize = Number(limit) || 10;

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const filter: any = {};

  if (search) {
    filter.title = {
      contains: search as string,
      mode: "insensitive",
    };
  }

  if (location) {
    filter.location = {
      contains: location as string,
      mode: "insensitive",
    };
  }

  if (salaryMax || salaryMin) {
    filter.AND = [
      {
        salaryMin: { gte: Number(salaryMin) || 0 },
      },
      {
        salaryMax: { lte: Number(salaryMax) },
      },
    ];
  }

  const jobs = await prisma.job.findMany({
    where: filter,
    skip,
    take,
  });

  return res.json({
    message: RESPONSE_MESSAGES.JOB.FETCHED,
    jobs,
  });
};
