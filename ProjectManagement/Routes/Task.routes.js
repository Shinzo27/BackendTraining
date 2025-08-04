import { Router } from 'express'
import { addTask, deleteTask, getTaskPerUserAndProject, getTasksOfUser, getTasksPerProject, editTask } from '../Controllers/Task.controller.js'

const router = Router()

router.get('/getTasksPerProject', getTasksPerProject)
router.get('/getTaskPerUserAndProject', getTaskPerUserAndProject)
router.get('/getTasksOfUser', getTasksOfUser)
router.post('/addTask', addTask)
router.delete('/deleteTask/:id', deleteTask)
router.put('/editTask/:id', editTask)

export default router