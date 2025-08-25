/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function getCartItems() {
      const { data } = await axios.get("http://localhost:8000/api/sales/cart");
      setCartItems(data.data);
      const items = data.data;
      const totalPrice = items.reduce(
        (sum: any, product: any) => sum + product.totalPrice,
        0
      );
      setTotalAmount(totalPrice);
    }
    getCartItems();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col mb-20 ">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="mt-10">
        <div className="bg-gray-200 p-10 rounded-lg  flex justify-between items-center gap-10">
          <div className="flex justify-center items-center gap-5 w-[300px]">
            Product Details
          </div>
          <div className="flex items-center justify-center gap-14">
            <div className="text-lg flex items-center justify-center gap-8 w-64">
              Quantity
            </div>
            <div className="text-lg font-bold w-20">Price</div>
          </div>
          <div className="flex items-center justify-center gap-10 w-42">
            <div className="font-bold text-lg flex items-center justify-center">
              Total
            </div>
            <div className="font-bold text-lg">Remove</div>
          </div>
        </div>
        {
            cartItems.length > 0 ? (
                <>
        <div className="mt-5 flex flex-col items-center justify-center gap-10">
          {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
        </div>
        <div className="flex items-center justify-end pr-5 mt-5">
          <h1 className="font-bold text-2xl">Total Amount : $ {totalAmount}</h1>
        </div>
        <div className="flex items-center justify-end pr-5 mt-5">
          <Button>
            <Link href={"/checkout"}>Checkout</Link>
          </Button>
        </div>
            </>
            ) : (
                <h1 className="font-bold text-3xl text-center mt-5">No Cart Items Found!</h1>
            )
        }   
      </div>
    </div>
  );
};

export default Page;
