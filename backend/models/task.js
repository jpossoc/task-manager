export default (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: "pending" },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "tasks",
    timestamps: false,
    underscored: true
  });

  return Task;
};
