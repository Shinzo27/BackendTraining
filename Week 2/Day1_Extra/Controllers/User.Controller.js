import User from "../Models/User.Model.js"
import jwt from 'jsonwebtoken'

export async function getUsers(req, res) {
    const users = await User.find({}).select('-password')

    return res.json({
        users: users
    })
}

export async function registerUser(req, res) {
    const body = req.body

    if( !body.name || !body.email || !body.password ) {
        return res.status(400).json({
            status: 400,
            message: "Enter data properly!"
        })
    }

    const user = new User()

    user.name = body.name
    user.email = body.email
    user.password = body.password

    await user.save()

    return res.json({
        status: 200,
        message: "User added successfully!"
    })
}

    export async function login( req, res ) {
    const body = req.body

    if(!body.email || !body.password) {
        return res.status(400).json({
            status: 400,
            message: "Enter data properly!"
        })
    }

    const user = await User.findOne({ email: body.email })

    if(user.password !== body.password) {
        return res.status(500).json({
            status: 500,
            message: "Password didn't match."
        })
    }

    const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET)

    res.cookie('user', token)

    return res.status(200).json({
        status: 200,
        message: "User logged in!"
    })
}