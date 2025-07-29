import sequelize from "../Libs/db.js";
import Company from "./Company.js";
import User from "./Users.js";

Company.hasMany(User, {
    foreignKey: 'companyId',
    onDelete: 'CASCADE'
})
User.belongsTo(Company, {
    foreignKey: 'companyId'
})

export { User, Company }  