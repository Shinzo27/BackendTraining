import { Request, Response } from "express";
import { loginValidations, registerValidations, updateValidations } from "../Lib/ZodValidations";
import { prisma } from '../Lib/prisma'
import { ZodError } from "zod";
import { hashPassword, verifyPassword } from "../Lib/Auth";
import jwt from 'jsonwebtoken'
import { RESPONSE_MESSAGES } from "../Lib/ResponseMessages";
import { TokenUser } from "../Lib/Types";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const login = async(req: Request, res: Response) => {
    try {
        loginValidations.parse(req.body)
        const {email, password} = req.body

        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        })

        if(!user) return res.json({
            message: RESPONSE_MESSAGES.ERROR.USER.NOT_FOUND
        })

        const checkPassword = await verifyPassword(password, user.password)

        if(!checkPassword) return res.json({
            message: RESPONSE_MESSAGES.ERROR.USER.INCORRECT_PASSWORD
        })

        const payload = {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email
        }

        const token = jwt.sign(payload, JWT_SECRET)

        res.cookie('user', token)

        return res.json({
            message: "User logged in!"
        })
    } catch (error) {
        if(error instanceof ZodError){
            return res.json({
                message: "Validation Error",
                error: error.issues
            })
        }
        return res.json({
            error
        })
    }
}

export const register = async(req: Request, res: Response) => {
    try {
        registerValidations.parse(req.body)

        const { name, email, password, role } = req.body

        const checkEmailExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(checkEmailExists) return res.json({
            message: RESPONSE_MESSAGES.ERROR.USER.ALREADY_EXISTS
        })

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        return user ? res.json({
            message: RESPONSE_MESSAGES.USER.Signup
        }) : res.json({
            message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST
        })
    } catch (error) {
        if(error instanceof ZodError) {
            return res.json({
                message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
                error: error.issues
            })
        }
        return res.json({
            message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
            error
        })
    }
}

export const getUserProfile = async(req: Request, res: Response) => {
    const userDetails = req.user

    const user = await prisma.user.findFirst({
        where: {
            email: userDetails.email
        }
    })

    if(!user) {
        return res.json({
            message: RESPONSE_MESSAGES.ERROR.USER.NOT_FOUND
        })
    }

    return res.json({
        message: RESPONSE_MESSAGES.USER.FETCHED,
        user
    })
}

export const updateUserProfile = async(req: Request, res: Response) => {
    try {
        updateValidations.parse(req.body)

        const { name, email, password} = req.body
        const updatedPassword = password && await hashPassword(password)

        const userDetail = req.user;

        const user = await prisma.user.update({
            where: {
                email: userDetail.email
            },
            data: {
                email: email && email,
                name: name && name,
                password: password && updatedPassword
            }
        })

        return user ? res.json({
            message: RESPONSE_MESSAGES.USER.UPDATED
        }) : res.json({
            message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST
        })
    } catch (error) {
        if(error instanceof ZodError) {
            return res.json({
                message: RESPONSE_MESSAGES.ERROR.VALIDATION_ERROR,
                error: error.issues
            })
        }
        return res.json({
            message: RESPONSE_MESSAGES.ERROR.BAD_REQUEST,
            error
        })
    }
}