/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ProductItem = ({
  item,
}: {
  item: {
    name: string;
    image: string;
    description: string;
    price: number;
    id: number;
    stock: number;
  };
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      if (quantity < 1) {
        return toast.error("Quantity should have to be more than 1!");
      }
      if (item.stock < quantity) {
        return toast.error("Not enough quantity in inventory!");
      }
      const { data } = await axios.post(
        "http://localhost:8000/api/sales/cart",
        {
          productId: item.id,
          quantity: quantity,
        }
      );
      if (data.success) {
        toast.success(data.message);
        setQuantity(1);
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg flex flex-col justify-center items-center gap-5 w-72">
      <div>
        <h1 className="font-bold text-2xl">{item.name}</h1>
      </div>
      <div>
        <Image
          src={`/${item.image}`}
          alt="image"
          height={200}
          width={200}
          className="rounded-lg"
        />
      </div>
      <div className="w-64 truncate">{item.description}</div>
      <div className="">
        <h1 className="font-bold text-lg">$ {item.price}</h1>
      </div>
      <div className="">
        <Input
          type="number"
          placeholder="Quantity"
          className="border border-black"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
        />
      </div>
      <div>
        <Button onClick={handleAddToCart}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default ProductItem;
