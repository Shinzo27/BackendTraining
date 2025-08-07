import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import indexRouter from './Router/Index.Routes'

dotenv.config();
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api', indexRouter)

app.get('/', (req:Request, res: Response) => {
    return res.json({
        message: "Server is healthy!"
    })
})

app.listen(process.env.PORT, () => console.log("Server is listening on the port: ", process.env.PORT))