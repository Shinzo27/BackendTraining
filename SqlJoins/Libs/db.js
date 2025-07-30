import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('Company', 'root', 'Shinzo@27', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize