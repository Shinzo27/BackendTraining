import z from 'zod'

const UserEnums = ['student', 'instructor']

export const postUserSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email('Enter email properly!'),
    password: z.string().min(6, 'Password should contain minimum 6 characters!').max(20, 'Password should contain maximum 20 characters!'),
})

export const updateUserSchema = z.object({
    name: z.string().nonempty().optional(),
    email: z.string().email('Enter email properly!').optional(),
    password: z.string().min(6, 'Password should contain minimum 6 characters!').max(20, 'Password should contain maximum 20 characters!').optional(),
})

export const addCategorySchema = z.object({
    name: z.string().nonempty()
})

export const updateCategorySchema = z.object({
    name: z.string().optional()
})

export const createCourseSchema = z.object({
    title: z.string().nonempty(),
    price: z.float32(),
    categoryId: z.number().int(),
    instructorId: z.number().int()
})

export const updateCourseSchema = z.object({
    title: z.string().optional(),
    price: z.float32().optional(),
    categoryId: z.number().int().optional(),
    instructorId: z.number().int().optional()
})