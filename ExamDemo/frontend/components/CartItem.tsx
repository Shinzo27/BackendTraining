/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Button } from "./ui/button";
import { CartType } from "@/lib/validations";
import axios from "axios";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { Trash } from "lucide-react";

const CartItem = ({
  item,
  setCartItems,
}: {
  item: CartType;
  setCartItems: Dispatch<SetStateAction<never[]>>;
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdateQuantity = async (type: string) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/sales/cart/${item.id}/${type}`
      );
      toast.success(data.message);
      if (type === "Increase") {
        setQuantity(quantity + 1);
      } else {
        setQuantity(quantity - 1);
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/sales/cart/${item.id}`
      );
      if (data.success) {
        toast.success(data.message);
        setCartItems(data.items);
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-gray-200 p-10 rounded-lg  flex justify-between items-center gap-10">
      <div className="flex justify-center items-center gap-5 w-[300px]">
        <Image
          src={`/${item.product.image}`}
          alt=""
          height={100}
          width={100}
          className="rounded-lg"
        />
        <h1 className="text-lg font-semibold w-44 truncate">
          {item.product.name}
        </h1>
      </div>
      <div className="flex items-center justify-center gap-14">
        <div className="text-lg flex items-center justify-around gap-8 w-64">
          <Button
            className="font-bold cursor-pointer"
            onClick={() => handleUpdateQuantity("Increase")}
          >
            +
          </Button>
          {quantity}
          <Button
            className="font-bold cursor-pointer"
            onClick={() => handleUpdateQuantity("Decrease")}
          >
            -
          </Button>
        </div>
        <div className="text-lg font-bold w-20">$ {item.product.price}</div>
      </div>
      <div className="flex items-center justify-center gap-10 w-42">
        <div className="font-bold text-lg flex items-center justify-center">
          $ {item.totalPrice}
        </div>
        <div className="font-bold">
          <Button className="cursor-pointer" onClick={handleDeleteItem}>
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
