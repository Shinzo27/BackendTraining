import express from "express";
import dotenv from "dotenv";
import db from "./Config/db.js";
import StudentRouter from "./Routes/Student.Routes.js";
import EnrollmentRouter from "./Routes/Enrollment.Routes.js";
import CourseRouter from "./Routes/Course.Routes.js";
import CategoryRouter from "./Routes/Category.Routes.js";
import InstructorRouter from "./Routes/Instructors.Routes.js"

dotenv.config();
const app = express();
app.use(express.json());

db.sync();

// Instructor Routes
app.use("/api/instructors", InstructorRouter)
// Students Routes
app.use("/api/students", StudentRouter);
// Enrollments Routes
app.use("/api/enrollments", EnrollmentRouter);
// Courses Routes
app.use("/api/courses", CourseRouter);
// Categories Routes
app.use("/api/category", CategoryRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Server is healthy!",
  });
});

app.listen(process.env.PORT, () =>
  console.log("Server is running on port: ", process.env.PORT)
);
