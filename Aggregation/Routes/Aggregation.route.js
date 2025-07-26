import { Router } from "express";
import {
  addInventoryValue,
  convertToUppercase,
  findProductNameWithUltraKeyword,
  findProductPriceBetween100to500,
  getAverageInventoryValuePerCategory,
  getAveragePriceCategory,
  getAverageStocks,
  getCategoryWithMostProduct,
  getHighestStockProduct,
  getMostValuableProduct,
  getProducts,
  getProductsofGroceriesWith50Stock,
  getProductwithMoreStockThanAvg,
  getStocksBelow10,
  getTotalInventoryRevenue,
  getTotalProducts,
  getTotalStockofCategory,
  getTotalStocks,
  groupCategoryWishProducts,
  sortProductByInventoryValue,
  TotalValueofInventory,
} from "../Controllers/Aggregation.Controller.js";

const router = Router();

router.get("/getAllProducts", getProducts);
router.get("/getTotalProducts", getTotalProducts);
router.get("/getTotalStocks", getTotalStocks);
router.get("/getAverageStocks", getAverageStocks);
router.get("/totalValueofInventory", TotalValueofInventory);
router.get("/getHighestStockProduct", getHighestStockProduct);
router.get("/groupCategoryWishProducts", groupCategoryWishProducts);
router.get("/getAveragePriceCategory", getAveragePriceCategory);
router.get("/getTotalStockofCategory", getTotalStockofCategory);
router.get("/getCategoryWithMostProduct", getCategoryWithMostProduct);
router.get("/getTotalInventoryRevenue", getTotalInventoryRevenue);
router.get("/getStocksBelow10", getStocksBelow10);
router.get("/addInventoryValue", addInventoryValue);
router.get("/getMostValuableProduct", getMostValuableProduct);
router.get("/sortProductByInventoryValue", sortProductByInventoryValue);
router.get(
  "/getAverageInventoryValuePerCategory",
  getAverageInventoryValuePerCategory
);
router.get("/findProductPriceBetween100to500", findProductPriceBetween100to500);
router.get("/findProductNameWithUltraKeyword", findProductNameWithUltraKeyword);
router.get(
  "/getProductsofGroceriesWith50Stock",
  getProductsofGroceriesWith50Stock
);
router.get("/getProductwithMoreStockThanAvg", getProductwithMoreStockThanAvg);
router.get("/convertToUppercase", convertToUppercase);

export default router;
