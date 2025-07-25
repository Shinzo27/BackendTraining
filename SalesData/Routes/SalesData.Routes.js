import { Router } from "express";
import { getMonthlyTrends, getOrderMoreThanAvgQuantity, getTop3Products, getTotalSalesPerCustomer } from "../Controllers/SalesData.Controller.js";

const router = Router()

router.get('/getTotalSalesPerCustomer', getTotalSalesPerCustomer)
router.get('/top3Product', getTop3Products)
router.get('/getOrderMoreThanAvgQuantity', getOrderMoreThanAvgQuantity)
router.get('/getMonthlyTrends', getMonthlyTrends)

export default router