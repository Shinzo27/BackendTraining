import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().required(),
  gr_number: Joi.number().integer().optional(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  department: Joi.string().optional(),
  className: Joi.string().optional(),
  roleId: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().required(),
  gr_number: Joi.number().integer().optional(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  department: Joi.string().optional(),
  className: Joi.string().optional(),
  roleId: Joi.number().integer().required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const roleSchema = Joi.object({
  name: Joi.string(),
  priority: Joi.number().integer(),
});

export const leaveSchema = Joi.object({
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  requestToId: Joi.string().required(),
  leaveType: Joi.string()
    .valid("FirstHalf", "SecondHalf", "FullDay")
    .required(),
  reason: Joi.string().required(),
  status: Joi.string().valid("Pending", "Approved", "Rejected").required(),
});

export const staticDataSchema = Joi.object({
  id: Joi.number().integer(),
  department: Joi.string().required(),
  className: Joi.string().required(),
  academicYear: Joi.string().required(),
  totalLeave: Joi.number().integer().required(),
  totalWorkingDays: Joi.number().integer().required(),
});

export const blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  authorId: Joi.string().required(),
});

export const userUpdate = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  gender: Joi.string().required(),
  department: Joi.string(),
  className: Joi.string(),
  image: Joi.string().required(),
  gr_number: Joi.string(),
  phone: Joi.string().required(),
  roleId: Joi.number().integer().required(),
  address: Joi.string().required(),
});
