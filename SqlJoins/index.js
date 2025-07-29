import express from 'express'
import sequelize from './Libs/db.js'
import { getEmployeeFromCompany } from './Controllers/Users.js'

const app = express()

sequelize.sync()

app.get('/', (req, res) => {
    res.json({ 
        message: "Server is healthy!"
    })
})

app.get('/getUserInfo', getEmployeeFromCompany)

app.listen(8000, () => console.log("Server is running on port: 8000"))