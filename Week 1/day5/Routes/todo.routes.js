import { Router } from "express";
import { addTodo, deleteTodo, editTodo, getTodos } from "../Controllers/todo.controller.js";
import { checkIsAuthenticated } from "../Middlewares/auth.js";

const router = Router()

router.get('/getTodos', getTodos)
router.post('/addTodo', checkIsAuthenticated, addTodo)
router.put('/editTodo/:id', checkIsAuthenticated, editTodo)
router.delete('/deleteTodo/:id', checkIsAuthenticated, deleteTodo)

export default router