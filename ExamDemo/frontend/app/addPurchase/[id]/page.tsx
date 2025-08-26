"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const [stock, setStock] = useState(0);
  const [name, setName] = useState("");
  const [currentStock, setCurrentStock] = useState("");

  const handleAddPurchase = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/products/updateStock/${id}`,
        { stock, type: "Increase" }
      );
      if (data.success) {
        toast.success(data.message);
        router.push("/purchases");
      }
    } catch (error: any) {
      return toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    async function getDetails() {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        console.log(data.product);
        setName(data.product.name);
        setCurrentStock(data.product.stock);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    }
    getDetails();
  }, [id]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-20 rounded-lg flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Update Product</h1>
          <h1 className="text-lg font-semibold">Product name: {name}</h1>
          <h1 className="text-lg font-semibold">
            Current stock: {currentStock}
          </h1>
        </div>
        <form
          className="flex items-center justify-center gap-6 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddPurchase();
          }}
        >
          <div>
            <Label>Enter New Stock</Label>
            <Input
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
              type="number"
              className="border border-black mt-3"
              placeholder="Enter the purchase of stock"
            />
          </div>
          <Button type="submit">Add Purchase</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
