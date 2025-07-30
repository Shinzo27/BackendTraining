import express from "express";
import dotenv from "dotenv";
import db from "./Lib/db.js";
import ProjectRouter from './Routes/Project.routes.js'
import TaskRouter from './Routes/Task.routes.js'
import UserRouter from './Routes/User.routes.js'

dotenv.config();
const app = express();
db.sync();

app.use(express.json());

app.use('/api/projects', ProjectRouter)
app.use('/api/tasks', TaskRouter)
app.use('/api/users', UserRouter)

app.get("/", (req, res) => {
  res.json({
    message: "Server healthy!",
  });
});

app.listen(process.env.PORT, () =>
  console.log("Server is running on : ", process.env.PORT)
);