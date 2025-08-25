import express from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "Healthy!",
  });
});

app.listen(process.env.PORT, () =>
  console.log("Server is running on port : " + process.env.PORT)
);
