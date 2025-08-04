import db from "../Config/db.js";
import { DataTypes, Sequelize } from "sequelize";

const Enrollment = db.define("Enrollment", {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
  },
  EnrolledAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("now"),
    allowNull: false,
  },
});

export default Enrollment;
