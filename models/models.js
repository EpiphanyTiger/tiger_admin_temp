import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt"; // ✅ Import bcrypt

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "admin" },
});

// ✅ Hash password before saving user
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
});

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  invoiceID: { type: DataTypes.INTEGER, allowNull: false },
  totalOrderValue: { type: DataTypes.FLOAT, allowNull: false },
  orderStatus: { type: DataTypes.TEXT, allowNull: false },
  nextPaymentDate: { type: DataTypes.DATE, allowNull: false },
});

export { sequelize, User, Product, Order };
