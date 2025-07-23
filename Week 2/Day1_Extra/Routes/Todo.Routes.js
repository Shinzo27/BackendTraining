import { Router } from "express";
import { deleteTodo, editTodo, getTodos, postTodo } from "../Controllers/Todo.Controller.js";
import { checkAuthentication } from "../Middleware/auth.js";

const router = Router()

router.get('/getTodos', checkAuthentication, getTodos)
router.post('/addTodo', checkAuthentication, postTodo)
router.put('/editTodo/:id', checkAuthentication, editTodo)
router.delete('/deleteTodo/:id', checkAuthentication, deleteTodo)

export default router