import express from "express";
import dotenv from "dotenv";
import db from "./Config/db.js";
import UserRouter from "./Routes/User.Routes.js";
import EnrollmentRouter from "./Routes/Enrollment.Routes.js";
import CourseRouter from "./Routes/Course.Routes.js";
import CategoryRouter from "./Routes/Category.Routes.js";
import InstructorRouter from "./Routes/Instructors.Routes.js"

dotenv.config();
const app = express();
app.use(express.json());

db.sync();

app.use("/api/instructors", InstructorRouter)
app.use("/api/users", UserRouter);
app.use("/api/enrollments", EnrollmentRouter);
app.use("/api/courses", CourseRouter);
app.use("/api/category", CategoryRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Server is healthy!",
  });
});

app.listen(process.env.PORT, () =>
  console.log("Server is running on port: ", process.env.PORT)
);
