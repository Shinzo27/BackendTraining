import { Router } from 'express'
import { deleteProject, getProjects, getProjectsWithUsers, updateProject } from '../Controllers/Project.controller.js'

const router = Router()

router.get('/getProjects', getProjects)
router.get('/getProjectsWithUsers/:id', getProjectsWithUsers)
router.delete('/deleteProject/:id', deleteProject)
router.put('/updateProject/:id', updateProject)

export default router;