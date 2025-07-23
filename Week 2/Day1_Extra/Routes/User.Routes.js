import { Router } from 'express'
import { getUsers, login, registerUser } from '../Controllers/User.Controller.js'

const router = Router()

router.get('/getUsers', getUsers)
router.post('/register', registerUser)
router.post('/login', login)

export default router