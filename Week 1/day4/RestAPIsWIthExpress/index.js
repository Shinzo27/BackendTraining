import express from "express";
import { getProducts, writeProducts } from './Services/Products.js'

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({
    message: "Server is healthy.",
    products: products,
  });
});

app.get("/getProducts", async (req, res) => {
  const products = await getProducts();
  return res.json({
    products: products,
  });
});

app.post("/addProduct", async (req, res) => {
  const body = req.body;

  const products = await getProducts();
  products.push(body);

  writeProducts(products);

  return res.json({
    status: 200,
    message: "Product Added Successfully!",
  });
});

app.put("/editProduct/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const products = await getProducts();

  const index = products.findIndex((t) => t.id === Number(id));

  if (index === -1)
    return res.json({
      status: 500,
      message: "Product not found!",
    });
  products[index] = { ...products[index], ...body };

  await writeProducts(products);

  return res.json({
    message: "Product edited successfully!",
  });
});

app.delete("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;

  const products = await getProducts();

  const index = products.findIndex((t) => t.id === Number(id));

  if (index === -1)
    return res.json({
      status: 500,
      message: "Product Not Found!",
    });

  products.splice(index, 1);

  console.log(products);

  await writeProducts(products);

  return res.json({
    status: 200,
    message: "Product Deleted Successfully!",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
