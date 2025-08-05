import z from "zod";

export const signUpSchema = z.object({
    name: z.string("Name should have to be string only!"),
    email: z.string().email("Enter correct email"),
    password: z.string("Password should have to be string only!"),
    gender: z.string("Gender should have to be string only!"),
    image: z.string("Image should have to be string only!"),
    gr_number: z.number().int("Number should have to be integer only!").optional(),
    phone: z.string("Number should have to be string only!"),
    address: z.string("Address should have to be string only!"),
    department: z.string("Department should have to be string only!").optional(),
    class: z.string("Class should have to be string only!").optional(),
    roleId: z.number().int("roleId should have to be number only!"),
})

export const signInSchema = z.object({
    email: z.string("Email should have to be string only!"),
    password: z.string("Password should have to be string only!")
})