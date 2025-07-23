import mongoose from "mongoose";
import Todos from "../Models/Todo.Model.js";

export async function getTodos(req, res) {
    console.log(req.user);
    const objectId = new mongoose.Types.ObjectId(req.user._id)
    console.log(objectId);
    const todos = await Todos.find({ userId: objectId }).populate('userId', '-password')
    console.log(todos);
    return res.json({
        status: 200,
        todos: todos
    })
}

export async function postTodo(req, res) {
    const body =req.body
    console.log(body.title);
    console.log(body.completed);
    
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
    console.log(todo);

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