import http from "http";

const products = [
  {
    id: 1,
    name: "Cashew",
    price: 110,
  },
];

const server = http.createServer((req, res) => {
  const { url } = req;
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // GET
  if (req.method === "GET") {
    return res.end(
      JSON.stringify({
        products: products,
      })
    );
  }
  // POST
  else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      products.push(JSON.parse(body));
      return res.end(
        JSON.stringify({
          products: products,
        })
      );
    });
  }
  // PUT
  else if (req.method === "PUT" && pathname.startsWith("/products/")) {
    const id = parseInt(pathname.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const updatedTodo = JSON.parse(body);
        const index = products.findIndex((t) => t.id === id);
        if (index === -1) {
          return res.end(JSON.stringify({ error: "Product not found!" }));
        } else {
          products[index] = { ...products[index], ...updatedTodo };
          return res.end(JSON.stringify(products[index]));
        }
      } catch (error) {
        return res.end({ error: "Something went wrong!" });
      }
    });
  }
  // DELETE
  else if (req.method === "DELETE" && pathname.startsWith("/products/")) {
    const id = parseInt(pathname.split("/")[2]);
    try {
      const index = products.findIndex((t) => t.id === id);
      if (index === -1) {
        return res.end(JSON.stringify({ error: "Product not found!" }));
      }
      products.splice(index, 1);
      return res.end(JSON.stringify(products));
    } catch (error) {
      return res.end(JSON.stringify({ error: "Something went wrong" }));
    }
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
