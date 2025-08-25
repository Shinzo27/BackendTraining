import {
  addProductValidation,
  updateProductValidation,
  updateStockValidation,
} from "../lib/valdiations.js";
import {
  addProduct,
  checkIfProductExists,
  deleteProductService,
  getProductByIdService,
  getProductsService,
  updateProductService,
  updateStockService,
} from "../services/products.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getProductsService();

    if (products.length <= 0) throw new Error("No Products Found!");

    return res.json({
      success: true,
      message: "Products Fetched!",
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    await addProductValidation.validateAsync();

    const { name, description, price, stock } = req.body;

    const image = req.file;

    const checkIfExists = await checkIfProductExists(name);

    if (checkIfExists) throw new Error("Product Already Exists!");

    const product = await addProduct(name, description, price, stock, image);

    if (!product) throw new Error("Something Went Wrong! Please Try again!");

    return res.json({
      success: true,
      message: "Product Created Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.isJoi ? "Validation Error" : "Something Went Wrong!",
      error: error.isJoi ? error.details : error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productDelete = await deleteProductService(id);

    if (!productDelete) throw new Error("Product Not Found!");

    return res.json({
      success: true,
      message: "Product Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    await addProductValidation.validateAsync();

    const { name, description, price } = req.body;
    const { id } = req.params;

    const update = updateProductService(id, name, description, price);

    if (!update) throw new Error("Product Not Found!");

    return res.json({
      success: true,
      message: "Product Updated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.isJoi ? "Validation Error" : "Something Went Wrong!",
      error: error.isJoi ? error.details : error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    if (!product) throw new Error("Product Not Found!");

    return res.json({
      success: true,
      message: "Product data fetched!",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

export const updateStock = async (req, res) => {
  try {
    await updateStockValidation.validateAsync(req.body);

    const { stock, type } = req.body;
    const { productId } = req.params;

    const update = await updateStockService(productId, stock, type);

    if (!update) throw new Error("Something went wrong!");

    return res.json({
      success: true,
      message: "Stock Updated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.isJoi ? "Validation Error" : "Something Went Wrong!",
      error: error.isJoi ? error.details : error.message,
    });
  }
};
