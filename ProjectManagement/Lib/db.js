import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const db = new Sequelize(dbName, username, password, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

export default db;
