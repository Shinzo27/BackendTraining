import express, { Request, Response } from "express";
import dotenv from "dotenv";
import indexRouter from "./Routes/Index.Router";
import cookieParser from "cookie-parser";
import { checkAuthentication } from "./Middlewares/auth";
import cron from 'node-cron'
import { sendMail } from "./Lib/ReminderService";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkAuthentication);

app.use("/api", indexRouter);

app.get("/", async (req: Request, res: Response) => {
  return res.json({
    message: "Server is healthy!",
  });
});

cron.schedule('* * * * *', async() => {
  await sendMail()
})

app.listen(process.env.PORT, () =>
  console.log("Server is running on port: ", process.env.PORT)
);
