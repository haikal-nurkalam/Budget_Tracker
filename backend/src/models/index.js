import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import User from "./User.js";
import Transaction from "./Transaction.js";
import Category from "./Category.js";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize.DataTypes);
db.Transaction = Transaction(sequelize, Sequelize.DataTypes);
db.Category = Category(sequelize, Sequelize.DataTypes);

// Define associations here if needed
db.User.hasMany(db.Transaction, { foreignKey: "userId" });
db.Transaction.belongsTo(db.User, { foreignKey: "userId" });

db.User.hasMany(db.Category, { foreignKey: "userId" });
db.Category.belongsTo(db.User, { foreignKey: "userId" });

export default db;
