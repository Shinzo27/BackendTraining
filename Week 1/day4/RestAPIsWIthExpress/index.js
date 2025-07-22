import express from "express";
import fs from "fs";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "Server is healthy.",
  });
});

app.get("/getProducts", async (req, res) => {
  let products;
  await fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) return err;
    console.log(data);
    products = JSON.parse(data);
    return res.json({
      status: 200,
      products: products,
    });
  });
});

app.post("/addProduct", async (req, res) => {
  const body = req.body;
  let products;
  await fs.readFile("./products.json", "utf8", async (err, data) => {
    if (err) return err;

    products = JSON.parse(data);

    products.push(body);

    await fs.writeFile("./products.json", JSON.stringify(products), (err) => {
      if (err)
        return res.status(500).json({
          message: "Something went wrong",
        });
    });
  });

  return res.json({
    status: 200,
    message: "Product Added Successfully!",
  });
});

app.put("/editProduct/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  let products;
  await fs.readFile("./products.json", "utf8", async (err, data) => {
    if (err)
      return res.status(500).json({
        message: "Something went wrong",
      });
    products = JSON.parse(data);
    console.log(products);
    const index = products.findIndex((t) => t.id === Number(id));
    console.log(index);
    if (index === -1)
      return res.json({
        status: 500,
        message: "Product not found!",
      });
    products[index] = { ...products[index], ...body };

    console.log(products);
    await fs.writeFile("./products.json", JSON.stringify(products), (err) => {
      if (err)
        return res.status(500).json({
          message: "Something went wrong",
        });
    });
    return res.json({
      status: 200,
      message: "Product Edited Successfully!",
    });
  });
});

app.delete("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;
  let products;
  
  await fs.readFile("./products.json", "utf8", async(err, data) => {
    if (err)
      return res.status(500).json({
        message: "Something went wrong",
      });
    products = JSON.parse(data);

    const index = products.findIndex((t) => t.id === Number(id));

    if (index === -1)
      return res.json({
        status: 500,
        message: "Product Not Found!",
      });

    products.splice(index, 1);
    
    await fs.writeFile("./products.json", JSON.stringify(products), (err) => {
      if (err)
        return res.status(500).json({
          message: "Something went wrong",
        });
    });

    return res.json({
      status: 200,
      message: "Product Deleted Successfully!",
    });
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
