import * as fs from "fs/promises";

export const getProducts = async () => {
  const products = await fs.readFile("./products.json", "utf8");
  const jsonData = JSON.parse(products);
  return jsonData;
};

export const writeProducts = async (products) => {
  await fs.writeFile("./products.json", JSON.stringify(products));
};