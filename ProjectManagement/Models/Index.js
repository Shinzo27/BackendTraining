import User from "./User.js";
import Project from "./Project.js";
import Task from "./Task.js";

User.hasMany(Project, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE", hooks: true });
Project.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Project.hasMany(Task, { foreignKey: "projectId", onDelete: "CASCADE", hooks: true });
Task.belongsTo(Project, { foreignKey: "projectId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

export { User, Task, Project };
