import { DataTypes } from "sequelize";
import db from "../Lib/db.js";
import User from "./User.js";

const Project = db.define('Project', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
})



export default Project