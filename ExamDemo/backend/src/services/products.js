import prisma from "../lib/prisma.js";

export const checkIfProductExists = async (name) => {
  const ifExists = await prisma.product.findFirst({
    where: {
      name,
    },
  });

  return ifExists ? true : false;
};

export const addProduct = async (name, description, price, stock, image) => {
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      image: `Uploads/${image.filename}`,
    },
  });

  return product ? true : false;
};

export const deleteProductService = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  return product ? true : false;
};

export const updateProductService = async (id, name, description, price) => {
  const updateProduct = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      description,
      price,
    },
  });

  return updateProduct ? true : false;
};

export const getProductsService = async () => {
  const products = await prisma.product.findMany({});

  return products;
};

export const getProductByIdService = async (id) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  return product ? product : false;
};

export const updateStockService = async (productId, stock, type) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });

  if (!product) throw new Error("Product not found!");

  let updatedStock;

  if (type === "Increase") {
    updatedStock = product.stock + stock;
  } else if (type === "Decrease") {
    if (product.stock < stock || product.stock == stock) {
      throw new Error("Not enough stock to decrease!");
    }
    updatedStock = product.stock - stock;
  }

  const update = await prisma.product.update({
    where: {
      id: Number(productId),
    },
    data: {
      stock: updatedStock,
    },
  });

  return update ? true : false;
};
