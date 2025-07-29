import { DataTypes } from "sequelize";
import sequelize from "../Libs/db";

const UsersWorkingDay = sequelize.define("UsersWorkingDay", {
  userId: DataTypes.INTEGER,
  workingDayId: DataTypes.INTEGER,
});

export default UsersWorkingDay;
