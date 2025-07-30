import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ProjectManagement", "root", "Shinzo@27", {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize