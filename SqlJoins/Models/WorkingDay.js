import { DataTypes } from "sequelize";
import sequelize from "../Libs/db";

const WorkingDay = sequelize.define("WorkingDay", {
  weekDay: DataTypes.STRING,
  workingDate: DataTypes.DATE,
  isWorking: DataTypes.BOOLEAN,
});

export default WorkingDay;
