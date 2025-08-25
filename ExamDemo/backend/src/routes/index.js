import { Router } from "express";
import productRouter from "./products.js";
import salesRouter from "./sales.js";

const router = Router();

router.use("/products", productRouter);
router.use("/sales", salesRouter);

export default router;
