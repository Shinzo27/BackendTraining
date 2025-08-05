import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from './Routes/User.Router'

dotenv.config();
const app = express();

app.use('/api/users', userRouter)

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Server is healthy!",
  });
});

app.listen(process.env.PORT, () =>
  console.log("Server is running on port: ", process.env.PORT)
);
