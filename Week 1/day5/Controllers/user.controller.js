import jwt from 'jsonwebtoken'

export function login(req, res) {
    const body = req.body

    if(!body.email) {
        return res.json({
            status: 400,
            message: "Enter email properly!"
        })
    }

    const token = jwt.sign({
        email: body.email
    }, process.env.JWT_SECRET)

    res.cookie('user', token)

    return res.json({
        status: 200,
        message: "User logged in."
    })
}