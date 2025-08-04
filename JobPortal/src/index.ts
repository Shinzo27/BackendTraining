import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import userRouter from './Router/User.Route.js'
import cookieParser from 'cookie-parser'
import companyRouter from './Router/Company.Routes.js'
import jobRouter from './Router/Job.Routes.js'
import applicationRouter from './Router/Application.Routes.js'

dotenv.config();
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/company', companyRouter)
app.use('/api/job', jobRouter)
app.use('/api/applications', applicationRouter)

app.get('/', (req:Request, res: Response) => {
    return res.json({
        message: "Server is healthy!"
    })
})

app.listen(process.env.PORT, () => console.log("Server is listening on the port: ", process.env.PORT))