import { Request, Response } from "express";
import { prisma } from "../Lib/prisma";
import { RESPONSE_MESSAGES } from "../Lib/ResponseMessages";
import {
  companyValidation,
  updateCompanyValidation,
} from "../Lib/ZodValidations";
import { checkIfUserValid } from "../Lib/Checks";
import { ZodError } from "zod";

export const getCompanyDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id)))
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
      });

    const details = await prisma.company.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return details
      ? res.json({
          message: RESPONSE_MESSAGES.COMPANY.FETCHED,
          details,
        })
      : res.json({
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
        });
  } catch (error) {
    return res.json({
      message: RESPONSE_MESSAGES.ERROR.WENT_WRONG,
      error: error
    })
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    companyValidation.parse(req.body);

    const { name, industry } = req.body;

    const user = req.user;

    const checkIfValid = await checkIfUserValid(user.id);

    if (!checkIfValid)
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.COMPANY.NOT_VALID,
      });

    const checkIfAlreadyExists = await prisma.company.findFirst({
      where: {
        name,
      },
    });

    if (checkIfAlreadyExists)
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.COMPANY.ALREADY_EXISTS,
      });

    const company = await prisma.company.create({
      data: {
        name,
        industry,
        userId: user.id,
      },
    });

    return company
      ? res.json({
          message: RESPONSE_MESSAGES.COMPANY.CREATED,
        })
      : res.json({
          message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
        });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.VALIDATION_ERROR,
        error: error.issues,
      });
    }
    return res.json({
      error,
    });
  }
};

export const updateCompanyInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    updateCompanyValidation.parse(req.body);

    const { name, industry } = req.body;

    const isValid = await checkIfUserValid(req.user.id);

    if (!isValid)
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.COMPANY.NOT_VALID,
      });

    const checkIfAlreadyExists = await prisma.company.findFirst({
      where: {
        name: name && name,
      },
    });

    if (checkIfAlreadyExists)
      return res.json({
        message: RESPONSE_MESSAGES.ERROR.COMPANY.ALREADY_EXISTS,
      });

    const company = await prisma.company.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name && name,
        industry: industry && industry,
      },
    });

    return company
      ? res.json({
          message: RESPONSE_MESSAGES.COMPANY.UPDATED,
        })
      : res.json({
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
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
