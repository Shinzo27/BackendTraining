import prisma from "../lib/prisma.js";

export const getSalesDataService = async () => {
  const sales = await prisma.salesData.findMany({
    where: {
      userId: 1,
    },
    include: {
      saleProductDetails: true,
    },
  });

  if (sales.length < 0) throw new Error("No Sales Data Found!");

  return sales;
};

export const getOrderDetails = async (id) => {
  const details = await prisma.salesData
    .findFirst({
      where: {
        id: Number(id),
      },
      include: {
        saleProductDetails: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    })
    .catch((error) => {
      throw new Error("No order details found!");
    });

  return details;
};

export const getCartDetailsService = async () => {
  const details = await prisma.cart.findMany({
    where: {
      userId: 1,
    },
    include: {
      product: {
        select: {
          name: true,
          price: true,
          image: true,
        },
      },
    },
  });

  return details.length > 0 ? details : [];
};

export const deleteCartItem = async (id) => {
  await prisma.cart
    .delete({
      where: {
        id: Number(id),
      },
    })
    .catch((error) => {
      throw new Error("Cart Item not found!");
    });

  return true;
};

export const updateCartQuantity = async (id, type) => {
  const cartItem = await prisma.cart
    .findFirst({
      where: {
        id: Number(id),
      },
      include: {
        product: {
          select: {
            price: true,
          },
        },
      },
    })
    .catch(() => {
      throw new Error("Item not found!");
    });

  let updatedQuantity = cartItem.quantity;
  let updatedTotalPrice = cartItem.totalPrice;

  if (type === "Increase") {
    updatedQuantity = cartItem.quantity + 1;
    updatedTotalPrice = cartItem.totalPrice + cartItem.product.price;
  } else if (type === "Decrease") {
    if (cartItem.quantity <= 1)
      throw new Error("Quantity can't be less than 1.");
    updatedQuantity = cartItem.quantity - 1;
    updatedTotalPrice = cartItem.totalPrice - cartItem.product.price;
  }

  const update = await prisma.cart.update({
    where: {
      id: Number(id),
    },
    data: {
      quantity: updatedQuantity,
      totalPrice: updatedTotalPrice,
    },
  });

  if (!update) throw new Error("Error Happened While updating cart!");

  return true;
};

export const checkIfItemValidAndFindTotalPrice = async (
  productId,
  quantity
) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(productId),
    },
  });

  if (!product) throw new Error("Product not found!");

  if (product.stock < quantity) throw new Error("Not Enough Quantity");

  const ifAlreadyExists = await prisma.cart.findFirst({
    where: {
      productId: Number(productId),
    },
  });

  if (ifAlreadyExists) throw new Error("Product already exists in the cart!");

  const totalPrice = product.price * quantity;

  return totalPrice;
};

export const addItemToCart = async (
  productId,
  userId,
  quantity,
  totalPrice
) => {
  const insert = await prisma.cart
    .create({
      data: {
        productId: productId,
        userId: userId,
        quantity: quantity,
        totalPrice: totalPrice,
      },
    })
    .catch((error) => {
      throw new Error(error);
    });

  return true;
};

export const getCartItems = async (id) => {
  const cartItems = await prisma.cart.findMany({
    where: {
      userId: id,
    },
  });

  return cartItems.length > 0 ? cartItems : [];
};

export const createSalesData = async (
  userId,
  address,
  city,
  pincode,
  total
) => {
  const createData = await prisma.salesData
    .create({
      data: {
        userId,
        address,
        city,
        pincode,
        total,
      },
    })
    .catch((error) => {
      throw new Error(error.message);
    });

  return createData;
};

export const validateQuantity = async (cartItems) => {
  for (const items of cartItems) {
    const product = await prisma.product.findFirst({
      where: {
        id: items.productId,
      },
      select: {
        name: true,
        stock: true,
      },
    });
    if (product.stock < items.quantity) {
      throw new Error(
        `Not enough quantity of ${product.name}, Remove it to proceed further!`
      );
      break;
    }
  }
  return true;
};

export const decreaseQuantity = async (cartItems) => {
  for (const items of cartItems) {
    const product = await prisma.product.findFirst({
      where: {
        id: items.productId,
      },
      select: {
        stock: true,
      },
    });
    if (!product) throw new Error("Product not found!");

    const updatedStock = product.stock - items.quantity;
    console.log(updatedStock);
    await prisma.product
      .update({
        where: {
          id: items.productId,
        },
        data: {
          stock: Number(updatedStock),
        },
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
  return true;
};

export const pushItemsToOrderTable = async (cartItems, orderId) => {
  for (const items of cartItems) {
    await prisma.saleProductDetails
      .create({
        data: {
          orderId: orderId,
          productId: items.productId,
          quantity: items.quantity,
        },
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    await prisma.cart
      .delete({
        where: {
          id: items.id,
        },
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
  return true;
};
