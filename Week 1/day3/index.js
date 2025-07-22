import express from 'express'
import { checkAuth } from './Middlewares/Auth.js'

const app = express()
const PORT = 8000

app.use(express.json())

app.get('/', (req,res) => {
    res.json({
        message: "Hello world!"
    })
})

app.post('/addProduct', checkAuth, (req, res) => {
    const body = req.body

    console.log(body);

    //Add Product logic
    
    res.json({
        status: 200,
        message: "Product Added Successfully!"
    })
})

app.put('/editProduct/:id', checkAuth, (req, res) => {
    const params = req.params
    const id = params.id
    const body = req.body

    console.log(id);
    console.log(body)

    //Update logic

    return res.json({
        status: 200,
        message: "Product Edited Successfully!"
    })
})

app.delete('/deleteProduct/:id', checkAuth, (req, res) => {
    const params = req.params;
    const id = params.id;
    
    console.log(id);

    //Delete Logic

    return res.json({
        status: 200,
        message: "Product Deleted Successfully!"
    })
})

app.listen(PORT, () => {
    console.log("Server is running on port 8000");
})