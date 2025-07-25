import express from "express";
import dotenv from "dotenv";
import bookRouter from "./Routes/Books.Route.js";
import mongoose from "mongoose";
import cors from 'cors'
import { migration } from "./Scripts/Migration.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"));
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use("/api/books", bookRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "Server is healthy!",
  });
});

migration()

app.listen(process.env.PORT, () => {
  console.log("Server is running on port: " + process.env.PORT);
});