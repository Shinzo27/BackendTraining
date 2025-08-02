import express from "express";
import dotenv from "dotenv";
import db from "../Lib/db.js";
import postRouter from './Routes/Post.Route.js'
import userRouter from './Routes/User.Route.js'
import commentRouter from './Routes/Comment.Route.js'

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comments', commentRouter)

app.get("/", (req, res) => {
  return res.json({
    message: "Server is healthy!",
  });
});


app.listen(process.env.PORT, () =>
  console.log("Server is running on ", process.env.PORT)
);
