import { User, Task, Project} from "../Models/Index.js"

export const getProjects = async(req, res) => {
    const projects = await Project.findAll({})

    return res.json({
        projects
    })
}

export const getProjectsWithUsers = async(req, res) => {
    const { id } = req.params;

    const projectPerUser = await Project.findAll({
        where: { id },
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        include: [{ model: User, attributes: ['id', 'name']}]
    })

    return res.json({
        projectPerUser
    })
}

export const deleteProject= async(req, res) => {
    const { id } = req.params
    const project = await Project.destroy({ where: { id }})

    if(project) {
        return res.json({
            message: "Project Deleted!"
        })
    } else {
        return res.json({
            message: "Something went wrong!"
        })
    }
}

export const updateProject = async(req, res) => {
    const { id } = req.params;
    const body = req.body

    const project = await Project.findByPk(id)

    project.name = body.name

    await project.save();

    return res.json({
        message: "Project Updated!"
    })
}