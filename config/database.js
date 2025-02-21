import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "tiger_adminjs_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "Cdr@80mins",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // ✅ Disable query logging
  }
);

export default sequelize;
