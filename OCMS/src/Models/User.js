import db from "../Config/db.js";
import { DataTypes } from "sequelize";

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 20],
    },
  },
  role: {
    type: DataTypes.ENUM,
    values: ["student", "instructor"],
    defaultValue: "student",
  },
});

export default User;
