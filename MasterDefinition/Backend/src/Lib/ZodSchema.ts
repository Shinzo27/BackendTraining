import z from "zod";

export const signUpSchema = z.object({
  name: z.string("Name should have to be string only!"),
  email: z.string().email("Enter correct email"),
  password: z.string("Password should have to be string only!"),
  gender: z.string("Gender should have to be string only!"),
  image: z.string("Image should have to be string only!"),
  gr_number: z
    .number()
    .int("Number should have to be integer only!")
    .optional(),
  phone: z.string("Number should have to be string only!"),
  address: z.string("Address should have to be string only!"),
  department: z.string("Department should have to be string only!").optional(),
  className: z.string("Class should have to be string only!").optional(),
  roleId: z.number().int("roleId should have to be number only!"),
});

export const signInSchema = z.object({
  email: z.string("Email should have to be string only!"),
  password: z.string("Password should have to be string only!"),
});

export const roleSchema = z.object({
  name: z.string("Name should have to be string only!"),
  priority: z.number().int("Number should have to be integer only!"),
});

const leaveEnum = [
  "FirstHalf",
  "SecondHalf",
  "FullDay",
]

const LeaveStatus = [
  "Pending",
  "Approved",
  "Rejected",
]

export const leaveSchema = z.object({
  startDate: z.string("startDate should have to be string only!"),
  endDate: z.string("endDate should have to be string only!"),
  requestToId: z.string("requestToId should have to be string only!"),
  leaveType: z.enum(leaveEnum, "Not Valid Leave Type!"),
  reason: z.string("Reason should have to be string only!"),
  status: z.enum(LeaveStatus, "Not Valid Status!"),
});
