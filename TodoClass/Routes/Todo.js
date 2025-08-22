import { Router } from "express";
import { TodoController } from "../Controller/Todo.js";

const router = Router();

router.get("/", TodoController.getTodos);
router.get("/:id", TodoController.getTodosById);
router.post("/", TodoController.createTodos);
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;
