import jwt from 'jsonwebtoken'
import User from '../Models/User.Model.js';

export async function auth(req, res, next) {
    const userCookie = req.cookies.user
    if(userCookie) {
        const payload = jwt.decode(userCookie, process.env.JWT_SECRET)
        const user = await User.findOne({ email: payload.email })
        req.user = user
        return next()
    } else {
        return next()
    }
}

export async function checkAuthentication(req, res, next) {
    if(req.user) {
        return next()
    } else {
        return res.status(401).json({
            message: "You are not authorized!"
        })
    }
}