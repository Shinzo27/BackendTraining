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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function getDetails() {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        console.log(data.product);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    }
    getDetails();
  }, [id]);
  const router = useRouter();

  const handleEditProduct = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/products/${id}`,
        { name, description, price }
      );
      if (data.success) {
        toast.success(data.message);
        router.push("/purchases");
      }
    } catch (error: any) {
      return toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-20 rounded-lg flex flex-col items-center justify-center gap-8">
        <div>
          <h1 className="text-2xl font-bold">Update Product</h1>
        </div>
        <form
          className="flex items-center justify-center gap-6 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditProduct();
          }}
        >
          <div>
            <Label>Enter Product Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              className="border border-black mt-3"
              placeholder="Enter Product name"
            />
          </div>
          <div>
            <Label>Enter Product Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              type="text"
              className="border border-black mt-3"
              placeholder="Enter product Description"
            />
          </div>
          <div>
            <Label>Enter Product Price</Label>
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              type="number"
              className="border border-black mt-3"
              placeholder="Enter product price"
            />
          </div>
          <Button type="submit">Edit Product</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
