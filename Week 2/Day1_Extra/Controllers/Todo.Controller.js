import mongoose from "mongoose";
import Todos from "../Models/Todo.Model.js";

export async function getTodos(req, res) {
    const objectId = new mongoose.Types.ObjectId(req.user._id)
    const todos = await Todos.find({ userId: objectId }).populate('userId', '-password')
    return res.json({
        status: 200,
        todos: todos
    })
}

export async function postTodo(req, res) {
    const body =req.body
    if(!body.title || !body.completed.toString()) {
        return res.status(400).json({
            status: 400,
            message: "Enter data properly!"
        })
    }

    const newTodo = new Todos()
    newTodo.title = body.title
    newTodo.completed = body.completed
    newTodo.userId = req.user._id

    await newTodo.save()

    return res.status(200).json({
        status: 200,
        message: "Todo added successfully!"
    })
}

export async function editTodo(req, res) {
    const body = req.body
    const { id } = req.params

    const todo = await Todos.findById({ _id: id})

    if(!todo) {
        return res.status(400).json({
            message: "Todo not found!"
        })
    }

    todo.completed = !todo.completed

    todo.save()

    return res.json({
        message: "Todo updated!"
    })
}

export async function deleteTodo(req, res) {
    const { id } = req.params

    const todo = await Todos.findByIdAndDelete({ _id: id})

    if(todo) {
        return res.json({
            message: "Todo deleted!"
        })
    } else {
        return res.status(500).json({
            message: "Todo not found!"
        })
    }
}