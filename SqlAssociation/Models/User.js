import { DataTypes } from "sequelize";
import db from "../Lib/db.js";
import Project from "./Project.js";

const User = db.define('User', {
    name: DataTypes.STRING,
})



export default User;