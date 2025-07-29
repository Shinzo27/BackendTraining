import { DataTypes } from "sequelize";
import sequelize from "../Libs/db.js";

const Company = sequelize.define("Company", {
  name: DataTypes.STRING
});

export default Company