/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState(0);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/sales/order/confirm",
        { address, city, pincode }
      );
      if (data.success) {
        toast.success(data.message);
        router.push("/products");
      }
    } catch (error: any) {
      return toast.error(error.response.data.error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-20 rounded-lg flex flex-col items-center justify-center gap-8">
        <div>
          <h1 className="text-2xl font-bold">Login Here</h1>
        </div>
        <form
          className="flex items-center justify-center gap-6 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckout();
          }}
        >
          <div>
            <Label>Enter Your Address</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              type="text"
              className="border border-black mt-3"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <Label>Enter Your City</Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              type="text"
              className="border border-black mt-3"
              placeholder="Enter your city"
            />
          </div>
          <div>
            <Label>Enter Your Pincode</Label>
            <Input
              value={pincode}
              onChange={(e) => setPincode(Number(e.target.value))}
              required
              type="number"
              className="border border-black mt-3"
              placeholder="Enter your pincode"
            />
          </div>
          <Button type="submit">Checkout</Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
