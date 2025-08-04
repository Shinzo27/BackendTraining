import { Router } from "express";
import { addUser, deleteUser, getProjectsOfUser, getTasksOfUser, getUsers } from "../Controllers/User.controller.js";

const router = Router()

router.get('/getUsers', getUsers)
router.get('/getProjectsOfUser', getProjectsOfUser)
router.get('/getTasksOfUser', getTasksOfUser)
router.delete('/deleteUser/:id', deleteUser)
router.post('/addUser', addUser)

export default router