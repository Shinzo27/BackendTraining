import { Project, Task, User } from "../Models/Index.js";

export const getTasksPerProject = async(req, res) => {
    const tasks = await Task.findAll({
        where: { projectId: 1},
        attributes: ['id', 'task', 'userId', 'createdAt', 'updatedAt'],
        include: [{ model: Project, attributes: ['name']}]
    })

    return res.json({
        tasks
    })
}
export const getTaskPerUserAndProject = async(req, res) => {
    const tasks = await Task.findAll({
        where: { userId: 1, projectId: 1},
        attributes: ['id', 'task', 'createdAt', 'updatedAt'],
        include: [{model: User, attributes: ['name']}, {model: Project, attributes: ['name']}]
    })

    return res.json({
        tasks
    })
}

export const getTasksOfUser = async(req, res) => {
    const tasks = await Task.findAll({
        where: { userId: 1 },
        attributes: ['id', 'task', 'createdAt', 'updatedAt'],
        include: [{ model: User, attributes: ['name']}, { model: Project, attributes: ['name']}]
    })

    return res.json({
        tasks
    })
}

export const addTask = async(req, res) => {
    const body = req.body;

    const task = await Task.create({
        task: body.task, projectId: body.projectId, userId: body.userId
    })

    if(task) {
        return res.json({
            message: "Task added!"
        })
    } else {
        return res.json({
            message: "Something went wrong!"
        })
    }
}

export const deleteTask = async(req, res) => {
    const { id } = req.params;

    const task = await Task.destroy({
        where: {
            id
        }
    })

    if(task) {
        return res.json({
            message: "Task Deleted!"
        })
    } else {
        return res.json({
            message: "Something went wrong!"
        })
    }
}

export const editTask = async(req, res) => {
    const { id } = req.params;
    const body = req.body

    const task = await Task.findByPk(id);

    task.task = body.task;
    
    await task.save()

    return res.json({
        message: "Task Updated!"
    })
}