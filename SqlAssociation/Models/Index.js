import User from "./User.js";
import Project from "./Project.js";

User.hasMany(Project, { foreignKey: "userId" });
Project.belongsTo(User, { foreignKey: "userId" });

export { User, Project };