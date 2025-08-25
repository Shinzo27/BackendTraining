"use client";

import ProductItem from "@/components/ProductItem";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get("http://localhost:8000/api/products/");
      console.log(data);
      setProducts(data.products);
    }
    getProducts();
  }, []);
  return (
    <div className="p-5 flex items-center justify-start flex-col">
      <div className="font-bold text-lg">All Products</div>
      <div className="mt-8 flex items-center justify-center flex-wrap gap-5">
        {products.map((product, index) => (
          <ProductItem item={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Page;
