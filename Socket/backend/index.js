import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
})

const users = []
const messages = []

io.on('connection', (socket) => {
    console.log("Socket Connected!");

    socket.on('message', ({text, roomId}) => {
        messages.push(text)
        io.to(roomId).emit('messageResponse', { messages: messages})
    })

    socket.on('joinRoom', ({user, room}) => {
        socket.join(room)
        users.push(user)
        io.to(room).emit('joinRoom', {user: user, users: users})
        console.log(`${user} joined room ${room}`)
    })
})

server.listen(3000, ()=> {
    console.log("Server started at port 3000");
})