import z, { ZodError } from "zod";
import { checkCategory } from "../Lib/Checks.js";
import { RESPONSE_MESSAGE } from "../Lib/ResponseMessage.js";
import { addCategorySchema, updateCategorySchema } from "../Lib/ZodSchema.js";
import { Category } from "../Models/index.js";

//Get Categories Controller
export const getCategories = async (req, res) => {
  const categories = await Category.findAll({});

  return res.json({
    message: RESPONSE_MESSAGE.CATEGORIES.FETCHED,
    categories,
  });
};

//Get Categories By Id Controller
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

//Create Category Controller
export const createCategory = async (req, res) => {
  const body = req.body;

  try {
    const parsedPayload = addCategorySchema.parse(body);

    const checkCategoryExists = await checkCategory('name', parsedPayload.name)

    if(checkCategoryExists) return res.json({
      message: RESPONSE_MESSAGE.CATEGORIES.ALREADY_EXISTS
    })

    const category = await Category.create({
      name: parsedPayload.name,
    });

    return category ? res.json({
      message: RESPONSE_MESSAGE.CATEGORIES.CREATED,
    }) : res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    })
  } catch (error) {
    if(error instanceof z.ZodError){
      return res.json({
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
        error: error.issues
      })
    }
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error,
    });
  }
};

//Update Category Controller
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

//Delete Category Controller
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
