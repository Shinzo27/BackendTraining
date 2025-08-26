import Joi from "joi";

export const addProductValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().precision(2).required(),
  stock: Joi.number().positive().integer().required(),
});

export const updateProductValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().precision(2).required(),
});

export const updateStockValidation = Joi.object({
  stock: Joi.number().integer().required(),
  type: Joi.string().valid("Increase", "Decrease").required(),
});

export const addToCartValidation = Joi.object({
  productId: Joi.number().positive().integer().required(),
  quantity: Joi.number().positive().integer().default(1).required(),
});

export const createOrderValidation = Joi.object({
  address: Joi.string().required(),
  city: Joi.string().required(),
  pincode: Joi.number().integer().required(),
});