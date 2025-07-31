import db from "../Config/db.js";
import { DataTypes } from "sequelize";

const Category = db.define("Category", {
  name: {
    type: DataTypes.STRING,
  },
});

export default Category;
