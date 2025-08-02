import db from "../Lib/db.js";
import { DataTypes } from "sequelize";

const User = db.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

export default User;
