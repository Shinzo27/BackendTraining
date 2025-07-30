import db from "../Lib/db.js";
import { DataTypes } from "sequelize";

const Project = db.define('Project', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
})

export default Project