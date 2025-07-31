import User from "./User.js";
import Course from "./Course.js";
import Enrollment from "./Enrollment.js";
import Category from "./Category.js";

User.hasMany(Course, { foreignKey: "instructorId", as: "Instructor", onDelete: 'CASCADE' });
User.hasMany(Enrollment, { foreignKey: "studentId", as: "Enrollments", onDelete: 'CASCADE' });

//One course can have only one instructor.
Course.belongsTo(User, { foreignKey: "instructorId", as: "Instructor" });
Course.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });
Course.hasMany(Enrollment, { foreignKey: "courseId", onDelete: 'CASCADE' });

Enrollment.belongsTo(Course, { foreignKey: "courseId" });
Enrollment.belongsTo(User, { foreignKey: "studentId" });

Category.hasMany(Course, { foreignKey: "categoryId" });

export { User, Course, Category, Enrollment };
