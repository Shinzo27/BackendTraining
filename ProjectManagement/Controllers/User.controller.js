import { Project, Task, User } from "../Models/Index.js";

export const getUsers = async(req, res) => {
    const users = await User.findAll({})

    return res.json({
        users
    })
}

export const getProjectsOfUser = async(req, res) => {
    const users = await User.findAll({
        where: { id: 3 },
        include: [{ model: Project, attributes: ['name']}]
    })

    return res.json({
        users
    })
}

export const getTasksOfUser = async(req, res) => {
    const users = await User.findAll({
        where: { id: 3 },
        include: [{ model: Task, attributes: ['task']}]
    })
    return res.json({
        users
    })
}

export const addUser = async(req, res) => {
    const body = req.body

    const user = await User.create({
        name: body.name, email: body.email
    })
    
    if(user) {
        return res.json({
            user,
            message: "User Created!"
        })
    } else {
        return res.json({
            message: "Something went wrong!"
        })
    }
}

export const deleteUser = async(req, res) => {
    const { id } = req.params
    const users = await User.destroy({ where: { id }})

    if(users) {
        return res.json({
            success: true,
            message: "User Deleted Successfully!"
        })
    } else {
        return res.json({
            message: "Something went wrong!"
        })
    }
}