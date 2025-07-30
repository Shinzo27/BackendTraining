import sequelize from '../Lib/db.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
}, { timestamps: false })

export default User;