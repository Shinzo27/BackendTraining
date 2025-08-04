import express from 'express'
import db from './Lib/db.js'
import { User, Project} from './Models/Index.js'

const app = express()

db.sync()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "Server healthy!"
    })
})

app.get('/getProjectWithUser', async(req, res)=> {
    const user = await Project.findAll({
        include: [{ model: User, attributes: ['id', 'name']}],
        attributes: ['id', 'title']
    })

    return res.json({
        user
    })
})

app.get('/getUsersProject', async(req, res) => {
    const user = await User.findAll({
        include: [{ model: Project, attributes: ['title']}],
    })

    return res.json({
        user
    })
})

app.listen(8000, ()=> console.log("Server is running on port: 8000"));