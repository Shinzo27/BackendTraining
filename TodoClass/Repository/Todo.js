import Todo from "../Models/Todo.js";

export const todoRepository = {
  async getTodos() {
    return await Todo.find({});
  },

  async getTodoById(id) {
    return await Todo.findById(id);
  },

  async createTodo(values) {
    return await Todo.create({ ...values });
  },

  async deleteTodo(id) {
    return await Todo.findByIdAndDelete(id);
  },

  async updateTodoStatus(id, value) {
    return await Todo.findByIdAndUpdate(id, { status: value });
  },
};
