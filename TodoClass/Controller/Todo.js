import { TodoService } from "../Services/Todo.js";

export const TodoController = {
  async getTodos(req, res) {
    const todos = await TodoService.getTodos();

    return res.json({
      message: "Todos Fetched!",
      todos,
    });
  },

  async getTodosById(req, res) {
    const { id } = req.params;

    const todo = await TodoService.getTodoById(id);

    return res.json({
      message: "Todo fetched!",
      todo,
    });
  },

  async createTodos(req, res) {
    const { title } = req.body;

    const create = await TodoService.createTodo({
      title: title,
      status: "Pending",
    });

    return res.json({
      message: "Todo Created!",
    });
  },

  async deleteTodo(req, res) {
    const { id } = req.params;

    const todoDelete = await TodoService.deleteTodo(id);

    return todoDelete
      ? res.json({
          message: "Todo deleted!",
        })
      : res.json({
          message: "Todo not found!",
        });
  },

  async updateTodo(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const todoUpdate = await TodoService.updateTodo(id, status);

    return todoUpdate
      ? res.json({
          message: "Todo Updated!",
        })
      : res.json({
          message: "Something went wrong!",
        });
  },
};
