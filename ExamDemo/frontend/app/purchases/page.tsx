"use client";
import { Button } from "@/components/ui/button";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [products, setProducts] = useState([]);
  
  
  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get("http://localhost:8000/api/products");
        setProducts(data.products);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    }
    getProducts();
  }, []);
  return (
    <div className="flex items-center justify-center gap-10 flex-col">
      <div>
        <h1 className="font-bold text-2xl mt-5">Products</h1>
      </div>
      <div className="flex justify-end-safe w-[600px]">
        <h1 className="font-bold text-2xl mt-5">
          <Button>
            <Link href={"/addProduct"}>Add Product</Link>
          </Button>
        </h1>
      </div>
      <div>
        <div>
          <Table className="w-[800px]">
            <TableCaption>A list of all products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[200px]">Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Add Purchase</TableHead>
                <TableHead>Edit Product</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: any, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="w-[200px] truncate">
                    {product.description}
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Button className="cursor-pointer">
                      <Link href={`/addPurchase/${product.id}`}>
                        Add Purchase
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button className="cursor-pointer">
                      <Link href={`/editProduct/${product.id}`}>
                        Edit Product
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
