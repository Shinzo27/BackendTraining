import z from "zod";

const UserEnums = ["student", "instructor"];

export const postUserSchema = z.object({
  name: z.string("Name should have to be string.").nonempty(),
  email: z
    .string("Email should have to be string.")
    .email("Enter email properly!"),
  password: z
    .string("Password should have to be string.")
    .min(6, "Password should contain minimum 6 characters!")
    .max(20, "Password should contain maximum 20 characters!"),
});

export const updateUserSchema = z.object({
  name: z.string("Name should have to be string.").nonempty().optional(),
  email: z
    .string("Email should have to be string.")
    .email("Enter email properly!")
    .optional(),
  password: z
    .string("Password should have to be string.")
    .min(6, "Password should contain minimum 6 characters!")
    .max(20, "Password should contain maximum 20 characters!")
    .optional(),
});

export const addCategorySchema = z.object({
  name: z.string("Name should have to be string.").nonempty(),
});

export const updateCategorySchema = z.object({
  name: z.string("Name should have to be string.").optional(),
});

export const createCourseSchema = z.object({
  title: z.string("Title should have to be string.").nonempty(),
  price: z.float32("Price should have to be float."),
  categoryId: z.number("categoryId should have to be number.").int(),
  instructorId: z.number("instructorId should have to be number.").int(),
});

export const updateCourseSchema = z.object({
  title: z.string("Ttile should have to be string.").optional(),
  price: z.float32("price should have to be number.").optional(),
  categoryId: z.number("categoryId should have to be number.").int().optional(),
  instructorId: z
    .number("instructorId should have to be number.")
    .int()
    .optional(),
});
