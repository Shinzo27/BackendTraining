/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, backgroundColor: "white", color: "black" },
  title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  section: { marginBottom: 10 },
  taskTitle: { fontSize: 14, marginTop: 10, fontWeight: "bold" },
  table: { display: "flex", width: "auto", marginTop: "10px" },
  row: { flexDirection: "row", backgroundColor: "#2196F3" },
  cell: { width: "20%", padding: 4, border: "1 solid #000" },
  header: { backgroundColor: "#FF8F00", color: "white", fontWeight: "bold" },
});

const PrintComponent = ({ order }: any) => {
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.title}>Order invoice</Text>
        <Text>Id: {order.id}</Text>
        <Text style={styles.title}>Name: {"Pratham Patel"}</Text>
        <Text style={styles.title}>Address: {order.address}</Text>
        <Text style={styles.title}>City: {order.city}</Text>
        <Text style={styles.title}>Pincode: {order.pincode}</Text>

        {order.saleProductDetails?.map((product: any, index: any) => (
          <View key={index} style={styles.section}>
            <Text style={styles.taskTitle}>{product.name}</Text>
            <Text style={styles.taskTitle}>{product.quantity}</Text>
          </View>
        ))}

        <Text style={styles.header}>{order.total}</Text>
      </Page>
    </Document>
  );
};

export default PrintComponent;
