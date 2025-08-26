import { Router } from "express";
import {
  addToCart,
  confirmOrder,
  getCartDetails,
  getSaleDetails,
  getSalesData,
  removeItemFromCart,
  updateItemFromCart,
} from "../controllers/sales.js";

const router = Router();

// Cart
router.get("/cart", getCartDetails);
router.post("/cart", addToCart);
router.put("/cart/:id/:type", updateItemFromCart);
router.delete("/cart/:id", removeItemFromCart);

// Order
router.get("/order", getSalesData);
router.get("/order/:id", getSaleDetails);
router.post("/order/confirm", confirmOrder);

export default router;
