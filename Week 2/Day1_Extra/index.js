import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import todoController from './Routes/Todo.Routes.js'
import userController from './Routes/User.Routes.js'
import { auth } from "./Middleware/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"));

app.use(express.json());
app.use(cookieParser())
app.use(auth)

app.use('/api/todos', todoController)
app.use('/api/user', userController)

app.get("/", (req, res) => {
  return res.json({
    message: "Server is healthy!",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on : " + process.env.PORT);
});
