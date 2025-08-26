"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>();
  const [stock, setStock] = useState(0);

  const router = useRouter();

  const handleUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setImage(e.target.files[0]);
  };

  const handleAddProduct = async () => {
    try {
      if (!image) return toast.error("Upload Image!");

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", price.toString());
      formData.append("stock", stock.toString());
      formData.append("image", image, image.name);

      const object = Object.fromEntries(formData.entries());

      const { data } = await axios.post(
        `http://localhost:8000/api/products`,
        {
          ...object,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
            handleAddProduct();
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
          <div>
            <Label>Enter Product Initial Stock</Label>
            <Input
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
              type="number"
              className="border border-black mt-3"
              placeholder="Enter product price"
            />
          </div>
          <div>
            <Label>Enter Product Image</Label>
            <Input
              required
              type="file"
              className="border border-black mt-3"
              onChange={(e) => handleUpdateFile(e)}
            />
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
