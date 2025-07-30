import db from '../Lib/db.js'
import { DataTypes } from 'sequelize'

const Books = db.define('Books', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    bookName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookDesc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookAuthor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noOfPage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    releasedYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, { timestamps: true })

export default Books;