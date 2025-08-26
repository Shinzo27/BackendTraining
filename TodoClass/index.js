import express from "express";
import todoRouter from "./Routes/Todo.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/todosClass")
  .then(() => console.log("Database Connected!"));

const app = express();

app.use(express.json());

app.use("/api/todo", todoRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Healthy!",
  });
});

app.listen(8000, () => console.log("Server running on port: 8000"));
