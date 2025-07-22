import jwt from 'jsonwebtoken'

export function auth(req, res, next) {
    const token = req.cookies.user

    if(token) {
        const payload = jwt.decode(token, process.env.JWT_SECRET)
        req.user = payload
        return next()
    } else {
        return next()
    }
}

export function checkIsAuthenticated(req, res, next) {
    if(req.user) {
        next()
    } else {
        return res.status(401).json({
            message: "You are not authorized!"
        })
    }
}