import { RESPONSE_MESSAGE } from "../Lib/ResponseMessage.js";
import { addCategorySchema, updateCategorySchema } from "../Lib/ZodSchema.js";
import { Category } from "../Models/index.js";

export const getCategories = async (req, res) => {
  const categories = await Category.findAll({});

  return res.json({
    message: RESPONSE_MESSAGE.CATEGORIES.FETCHED,
    categories,
  });
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: {
      id,
    },
  });

  return category
    ? res.json({
        message: RESPONSE_MESSAGE.CATEGORIES.FETCHED,
        category,
      })
    : res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
};

export const createCategory = async (req, res) => {
  const body = req.body;

  try {
    const parsedPayload = addCategorySchema.parse(body);

    const category = await Category.create({
      name: parsedPayload.name,
    });

    if (category) {
      return res.json({
        message: RESPONSE_MESSAGE.CATEGORIES.CREATED,
      });
    }
  } catch (error) {
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error,
    });
  }
};

export const updateCategory = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const parsedPayload = updateCategorySchema.parse(body);

    const category = await Category.update(
      {
        name: parsedPayload.name,
      },
      { where: { id } }
    );

    return category
      ? res.json({
          message: RESPONSE_MESSAGE.CATEGORIES.UPDATED,
        })
      : res.json({
          message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
        });
  } catch (error) {
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.destroy({
      where: { id },
    });

    return category
      ? res.json({
          message: RESPONSE_MESSAGE.CATEGORIES.DELETED,
        })
      : res.json({
          message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
        });
  } catch (error) {
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error,
    });
  }
};
