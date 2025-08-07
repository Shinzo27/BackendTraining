import z from "zod";

export const loginValidations = z.object({
  email: z.string("Email must have to be string!").email("Enter proper email!"),
  password: z.string("Password must have to be string"),
});

export const registerValidations = z.object({
  name: z.string("Name must have to be string!"),
  email: z.string("Email must have to be string!").email("Enter proper email!"),
  password: z.string("Password must have to be string!"),
  role: z.enum(
    ["APPLICANT", "RECRUITER"],
    "Role should have to be either Applicant or Recruiter!"
  ),
});

export const updateValidations = z.object({
  name: z.string("Name must have to be string!").optional(),
  email: z
    .string("Email must have to be string!")
    .email("Enter proper email!")
    .optional(),
  password: z.string("Password must have to be string!").optional(),
});

export const companyValidation = z.object({
  name: z.string("Name must have to be string!"),
  industry: z.string("Industry must have to be string!"),
});

export const updateCompanyValidation = z.object({
  name: z.string("Name must have to be string!").optional(),
  industry: z.string("Industry must have to be string!").optional(),
});

export const createJobValidation = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  salaryMin: z.float64(),
  salaryMax: z.float64(),
  companyId: z.number().int(),
})

enum JobStatus {
  PENDING,
  ACCEPTED,
  REJECTED
}

export const applyJobValidations = z.object({
  JobId: z.number().int(),
  coverLetter: z.string(),
})