/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IOrderDetails } from "@/lib/validations";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, backgroundColor: "white", color: "black" },
  title: { fontSize: 18, marginBottom: 10, fontWeight: "bold", marginTop: 10 },
  subtitle: { fontSize: 14, marginBottom: 10, fontWeight: "light" },
  section: { marginBottom: 10 },
  taskTitle: { fontSize: 14, marginTop: 10, fontWeight: "bold" },
  table: { display: "flex", width: "auto", marginTop: "10px" },
  row: { flexDirection: "row" },
  cell: { width: "20%", padding: 4 },
  header: {
    backgroundColor: "#FF8F00",
    color: "white",
    fontWeight: "bold",
    width: "auto",
  },
  total: {
    backgroundColor: "#FF8F00",
    color: "white",
    fontWeight: "bold",
    padding: 5,
    fontSize: 18,
  },
  image: {
    width: "110px",
    height: "80px",
  },
});

const PrintComponent = ({ order }: any) => {
  const [orderDetail, setOrderDetail] = useState<IOrderDetails | undefined>();

  useEffect(() => {
    async function getDetails() {
      const { data } = await axios.get(
        `http://localhost:8000/api/sales/order/${order.id}`
      );
      console.log(data.data);
      setOrderDetail(data.data);
    }
    getDetails();
  }, [order]);

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.title}>Order invoice</Text>
        <Text>Id: {orderDetail?.id}</Text>
        <Text style={styles.title}>Name: {"Pratham Patel"}</Text>
        <Text style={styles.subtitle}>Address: {orderDetail?.address}</Text>
        <Text style={styles.subtitle}>City: {orderDetail?.city}</Text>
        <Text style={styles.subtitle}>Pincode: {orderDetail?.pincode}</Text>

        {orderDetail?.saleProductDetails?.map((product: any, index: any) => (
          <View key={index} style={styles.section}>
            <View style={styles.table}>
              <View style={[styles.row, styles.header]}>
                <Text style={styles.cell}>Image</Text>
                <Text style={styles.cell}>Product Name</Text>
                <Text style={styles.cell}>Quantity</Text>
                <Text style={styles.cell}>Price</Text>
                <Text style={styles.cell}>Total</Text>
              </View>
              <View style={styles.row}>
                <Image src={`/${product.product.image}`} style={styles.image} />
                <Text style={styles.cell}>{product.product.name}</Text>
                <Text style={styles.cell}>{product.quantity}</Text>
                <Text style={styles.cell}>{product.product.price}</Text>
                <Text style={styles.cell}>
                  {product.product.price * product.quantity}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.total}>Total Amount : {orderDetail?.total}</Text>
      </Page>
    </Document>
  );
};

export default PrintComponent;
