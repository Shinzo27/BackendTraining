import express from 'express'
import dotenv from 'dotenv'
import todoRouter from './Routes/todo.routes.js'
import userRouter from './Routes/user.routes.js'
import cookieParser from 'cookie-parser'
import { auth } from './Middlewares/auth.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(auth)

dotenv.config()

app.get('/', (req, res) => {
    return res.json({
        message: "Server is healthy!"
    })
})

app.use('/api/todos', todoRouter)
app.use('/api/user', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is listening on ${process.env.PORT}`);
})