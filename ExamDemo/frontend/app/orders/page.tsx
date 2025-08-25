"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import PrintComponent from "@/components/PrintComponent";
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
    <div>
      <div>Orders</div>
      <div>
        {orders.map((order: any) => (
          <>
            <h1>{order.id}</h1>
            <PDFDownloadLink document={<PrintComponent order={order} />}>
              <button className="p-2 bg-blue-700 rounded-lg text-white">
                <PrinterIcon />
              </button>
            </PDFDownloadLink>
          </>
        ))}
      </div>
    </div>
  );
};

export default Page;
