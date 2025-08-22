import { todoRepository } from "../Repository/Todo.js";

export const TodoService = {
  async getTodos() {
    const todos = await todoRepository.getTodos();

    return todos;
  },

  async getTodoById(id) {
    const todoById = await todoRepository.getTodoById(id);

    return todoById;
  },

  async createTodo(values) {
    const todo = await todoRepository.createTodo(values);

    return todo;
  },

  async deleteTodo(value) {
    const todo = await todoRepository.deleteTodo(value);

    return todo ? true : false;
  },

  async updateTodo(id, status) {
    const todo = await todoRepository.updateTodoStatus(id, status);

    return todo ? true : false;
  },
};
