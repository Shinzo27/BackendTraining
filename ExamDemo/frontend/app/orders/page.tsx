"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import PrintComponent from "@/components/PrintComponent";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { PrinterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function getOrders() {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/sales/order"
        );
        setOrders(data.data);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    }
    getOrders();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <div>Orders</div>
      <div className="w-[800px]">
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Order Placed On</TableHead>
              <TableHead>Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{order.id}</TableCell>
                {/* <TableCell>{order.user.name}</TableCell> */}
                <TableCell>{"Pratham Patel"}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <PDFDownloadLink document={<PrintComponent order={order} />}>
                    <button className="p-2 bg-black rounded-lg text-white">
                      <PrinterIcon />
                    </button>
                  </PDFDownloadLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
