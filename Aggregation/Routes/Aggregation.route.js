import { Router } from "express";
import { getAveragePriceCategory, getAverageStocks, getHighestStockProduct, getProducts, getTotalProducts, getTotalStockofCategory, getTotalStocks, groupCategoryWishProducts, TotalValueofInventory } from "../Controllers/Aggregation.Controller.js";

const router = Router()

router.get('/getAllProducts', getProducts)
router.get('/getTotalProducts', getTotalProducts)
router.get('/getTotalStocks', getTotalStocks)
router.get('/getAverageStocks', getAverageStocks)
router.get('/totalValueofInventory', TotalValueofInventory)
router.get('/getHighestStockProduct', getHighestStockProduct)
router.get('/groupCategoryWishProducts', groupCategoryWishProducts)
router.get('/getAveragePriceCategory', getAveragePriceCategory)
router.get('/getTotalStockofCategory', getTotalStockofCategory)

export default router