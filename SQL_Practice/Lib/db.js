import { Sequelize } from "sequelize";

const config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Shinzo@27",
  DB: "users",
  dialect: "mysql",
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
});

export default sequelize;
