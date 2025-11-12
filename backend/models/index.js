import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

import UserModel from "./user.js";
import TaskModel from "./task.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database/database.sqlite"),
  logging: false
});

const User = UserModel(sequelize, DataTypes);
const Task = TaskModel(sequelize, DataTypes);

// Asociaciones
User.hasMany(Task, { foreignKey: "user_id", as: "tasks" });
Task.belongsTo(User, { foreignKey: "user_id", as: "user" });

const db = { sequelize, Sequelize, User, Task };
export default db;
