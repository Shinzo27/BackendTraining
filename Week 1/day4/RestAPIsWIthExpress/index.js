import express from 'express'

const app = express()
const PORT = 8000

app.use(express.json())

const products = [
    {
        id: 1,
        name: "Cashew",
        price: 550
    },
    {
        id: 2,
        name: "Almonds",
        price: 700
    },
    {
        id: 3,
        name: "Walnuts",
        price: 300
    }
]

app.get('/', (req, res) => {
    return res.json({
        message: "Server is healthy."
    })
})

app.get('/getProducts', (req,res) => {
    return res.json({
        status: 200,
        products: products
    })
})

app.post('/addProduct', (req, res) => {
    const body = req.body

    products.push(body)

    return res.json({
        status: 200,
        message: "Product Added Successfully!"
    })
})

app.put('/editProduct/:id', (req, res) => {
    const { id } = req.params
    const body = req.body

    const index = products.findIndex((t) => t.id === Number(id))
    if(index === -1) return res.json({
        status: 500, 
        message: "Product not found!"
    })
    products[index] = { ...products[index], ...body}

    return res.json({
        status: 200,
        message: "Product Edited Successfully!"
    })
})

app.delete('/deleteProduct/:id', (req, res) => {
    const { id } = req.params

    const index = products.findIndex((t) => t.id === Number(id))
    if(index === -1) return res.json({
        status: 500,
        message: "Product Not Found!"
    })

    products.splice(index, 1)
    
    return res.json({
        status: 200,
        message: "Product Deleted Successfully!"
    })
})

app.listen(PORT, () => {
    console.log("Server is running on port: "+ PORT);
})