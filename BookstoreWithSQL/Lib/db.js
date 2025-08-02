import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Bookstore", "root", "Shinzo@27", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;