const todos = [
    {
        id: 1,
        title: "Go to gym",
        completed: false
    },
    {
        id: 2,
        title: "Go to temple",
        completed: false
    },
    {
        id: 3,
        title: "Go to office",
        completed: true
    }
]

export function getTodos(req,res) {
    return res.json({
        status: 200,
        todos: todos
    })
}

export function addTodo(req, res) {
    const body = req.body

    if(!body.id || !body.title || body.completed === '') {
        return res.status(400).json({
            status: 400,
            message: "Enter data properly!"
        })
    }

    todos.push(body)

    return res.json({
        status: 200,
        message: "Todo added successfully!"
    })
}

export function editTodo(req, res) {
    const body = req.body
    const { id } = req.params

    if(!id) return res.status(400).json({
        status: 400,
        message: "Id not found!"
    })

    const index = todos.findIndex((t) => t.id === Number(id))

    if(index === -1) return res.json({
        status: 400,
        message: "Todo not found!"
    })

    todos[index] = {...todos[index], ...body}

    return res.json({
        status: 200,
        message: "Todo edited successfully!"
    })
}

export function deleteTodo(req, res) {
    const { id } = req.params

    const index = todos.findIndex((t) => t.id === Number(id))

    if(index === -1) return res.status(400).json({
        status: 400,
        message: "No todo found!"
    })
    
    todos.splice(index, 1)

    return res.json({
        status: 200,
        message: "Todo deleted successfully!"
    })
}