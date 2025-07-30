import { DataTypes } from "sequelize";
import sequelize from "../Libs/db.js";

const User = sequelize.define("Users", {
  name: DataTypes.STRING,
  companyId: DataTypes.STRING,
});

User.associations = (models) => {
    User.belongsTo(
        models.Company,
        {
            foreignKey: 'companyId',
            as: 'company'
        }
    )
}

export default User