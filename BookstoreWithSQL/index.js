import db from './Lib/db.js'
import express from 'express'
import bookRouter from './Routes/Books.routes.js'

const app = express()

db.sync()
app.use(express.json())

app.use('/api/books', bookRouter)
app.get('/', (req, res) => {
    res.json({
        message: "Server is healthy!"
    })
})

app.listen(8000, () => console.log("Server is running on port: 8000"));