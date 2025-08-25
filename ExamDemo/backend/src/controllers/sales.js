import {
  addToCartValidation,
  createOrderValidation,
} from "../lib/valdiations.js";
import {
  addItemToCart,
  checkIfItemValidAndFindTotalPrice,
  createSalesData,
  decreaseQuantity,
  deleteCartItem,
  getCartDetailsService,
  getCartItems,
  getOrderDetails,
  getSalesDataService,
  pushItemsToOrderTable,
  updateCartQuantity,
  validateQuantity,
} from "../services/sales.js";

export const getSalesData = async (req, res) => {
  try {
    const data = await getSalesDataService();

    return res.json({
      success: true,
      message: "Sales Data Fetched!",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

export const getSaleDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const details = await getOrderDetails(id);

    return res.json({
      success: true,
      message: "Order detail fetched!",
      data: details,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

export const getCartDetails = async (req, res) => {
  try {
    const cartItems = await getCartDetailsService();

    return res.json({
      success: true,
      message: "Cart Details Fetched!",
      data: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteItem = await deleteCartItem(id);

    return res.json({
      success: true,
      message: "Item Removed!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

export const updateItemFromCart = async (req, res) => {
  try {
    const { id, type } = req.params;
    console.log(type != "Increase" && type != "Decrease");

    if (type != "Increase" && type != "Decrease") {
      throw new Error("Invalid Type!");
    }

    await updateCartQuantity(id, type);

    return res.json({
      success: true,
      message: "Cart quantity updated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    await addToCartValidation.validateAsync(req.body);

    const { productId, quantity } = req.body;

    const checkIsValidAndGetTotalPrice =
      await checkIfItemValidAndFindTotalPrice(productId, quantity);

    if (checkIsValidAndGetTotalPrice) {
      const updateCart = await addItemToCart(
        productId,
        1,
        quantity,
        checkIsValidAndGetTotalPrice
      );

      if (updateCart)
        return res.json({
          success: true,
          message: "Added to the cart!",
        });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.isJoi ? "Validation Error" : "Something Went Wrong!",
      error: error.isJoi ? error.details : error.message,
    });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    await createOrderValidation.validateAsync(req.body);

    const { address, city, pincode } = req.body;

    const cartItems = await getCartItems(1);

    if (cartItems.length < 1) throw new Error("Cart is empty!");
    await validateQuantity(cartItems);

    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const salesData = await createSalesData(1, address, city, pincode, total);

    await decreaseQuantity(cartItems);

    await pushItemsToOrderTable(cartItems, salesData.id);

    return res.json({
      success: true,
      message: "Congratulations! Your order is placed!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.isJoi ? "Validation Error" : "Something Went Wrong!",
      error: error.isJoi ? error.details : error.message,
    });
  }
};