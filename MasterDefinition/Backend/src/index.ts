import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./Routes/User.Router";
import roleRouter from "./Routes/Role.Router";
import studentRouter from './Routes/Student.Router'
import facultyRouter from './Routes/Faculty.Router'

import cookieParser from "cookie-parser";
import { checkAuthentication } from "./Middlewares/auth";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(checkAuthentication);

app.use("/api/users", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/student", studentRouter)
app.use("/api/faculty", facultyRouter)

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Server is healthy!",
  });
}); 

app.listen(process.env.PORT, () =>
  console.log("Server is running on port: ", process.env.PORT)
);
