import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import salesDataRouter from './Routes/SalesData.Routes.js'
import Customer from './Models/Customers.js'
import Order from './Models/Orders.js'
import Products from './Models/Products.js'

dotenv.config();

await mongoose.connect(process.env.MONGO_URI).then(() => { console.log("MongoDB Connected!") });

const app = express()

app.use('/api/salesData', salesDataRouter)

app.get('/', (req, res) => { 
    res.json({
        message: "Server is healthy!"
    })
})

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port: ", process.env.PORT);
})