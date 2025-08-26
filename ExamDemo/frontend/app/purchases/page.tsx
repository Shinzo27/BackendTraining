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
import { Trash2 } from "lucide-react";
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

  const handleDeleteProduct = async (id: number) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/products/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        setProducts(data.products);
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
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
                <TableHead className="w-[150px] text-center">
                  Add Purchase
                </TableHead>
                <TableHead className="w-[150px] text-center">
                  Edit Product
                </TableHead>
                <TableHead>Delete Product</TableHead>
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
                  <TableCell className="text-center">
                    <Button className="cursor-pointer">
                      <Link href={`/addPurchase/${product.id}`}>
                        Add Purchase
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button className="cursor-pointer">
                      <Link href={`/editProduct/${product.id}`}>
                        Edit Product
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell className="cursor-pointer text-center">
                    <Button
                      className="cursor-pointer"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="text-white" />
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
