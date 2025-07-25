import mongoose from "mongoose";
import express from 'express'
import aggregationRouter from './Routes/Aggregation.route.js'
import { getProducts } from "./Controllers/Aggregation.Controller.js";

const app = express()
await mongoose.connect('mongodb://localhost:27017/test').then(() => console.log("MongoDB Connected!"))

app.use("/api/aggregation", aggregationRouter)


app.get('/', (req, res) => {
    return res.json({
        message: "Server is healthy!"
    })
})

app.get('/getAllProducts', getProducts)

app.listen(8000, () => {
    console.log("Server is listening on 8000");
})