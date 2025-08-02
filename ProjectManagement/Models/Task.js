import sequelize from '../Lib/db.js'
import { DataTypes } from 'sequelize'

const Task = sequelize.define('Task', {
    task: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
})

export default Task