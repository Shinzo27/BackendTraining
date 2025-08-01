import { Op } from "sequelize";
import { checkCategory, checkUser } from "../Lib/Checks.js";
import { RESPONSE_MESSAGE } from "../Lib/ResponseMessage.js";
import { createCourseSchema, updateCourseSchema } from "../Lib/ZodSchema.js";
import { Category, Course, User } from "../Models/index.js";

export const getCourseById = async (req, res) => {
  const { id } = req.params;

  const course = await Course.findOne({
    where: {
      id,
    },
    include: [
      { model: User, attributes: ["name", "email"], as: "Instructor" },
      { model: Category, attributes: ["name"], as: "Category" },
    ],
  });

  return course
    ? res.json({
        message: RESPONSE_MESSAGE.COURSE.FETCHED,
        course,
      })
    : res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
};

export const createCourse = async (req, res) => {
  try {
    const parsedPayload = createCourseSchema.parse(req.body);

    const checkUserExists = await checkUser(
      parsedPayload.instructorId,
      "instructor"
    );

    if (!checkUserExists)
      return res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    const checkCategoryExists = await checkCategory(parsedPayload.categoryId);

    if (!checkCategoryExists)
      return res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    const course = await Course.create({
      title: parsedPayload.title,
      price: parsedPayload.price,
      categoryId: parsedPayload.categoryId,
      instructorId: parsedPayload.instructorId,
    });

    return course
      ? res.json({
          message: RESPONSE_MESSAGE.COURSE.CREATED,
        })
      : res.json({
          message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
        });
  } catch (error) {
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error,
    });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const course = await Course.destroy({
    where: {
      id,
    },
  });

  return course
    ? res.json({
        message: RESPONSE_MESSAGE.COURSE.DELETED,
      })
    : res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const parsedPayload = updateCourseSchema.parse(req.body);

    const checkCategoryExists = parsedPayload.categoryId
      ? await checkCategory(parsedPayload.categoryId)
      : true;

    if (!checkCategoryExists)
      return res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    const checkUserExists = parsedPayload.instructorId
      ? await checkUser(parsedPayload.instructorId, "instructor")
      : true;

    if (!checkUserExists)
      return res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    const course = await Course.findOne({
      where: { id },
    });

    course.title = parsedPayload.title ? parsedPayload.title : course.title;
    course.price = parsedPayload.price ? parsedPayload.price : course.price;
    course.categoryId = parsedPayload.categoryId
      ? parsedPayload.categoryId
      : course.categoryId;
    course.instructorId = parsedPayload.instructorId
      ? parsedPayload.instructorId
      : course.instructorId;

    await course.save();

    return res.json({
      message: RESPONSE_MESSAGE.COURSE.UPDATED,
    });
  } catch (error) {
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error,
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const {
      search = "",
      categoryId,
      minPrice,
      maxPrice,
      limit,
      offset,
      sortBy = "createdAt",
      order = "DESC",
    } = req.query;

    const sortableField = ["title", "price", "createdAt"];
    if (!sortableField.includes(sortBy)) {
      return res.json({
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });
    }

    const whereCondition = {};

    if (search) {
      whereCondition.title = { [Op.like]: `%${search}%` };
    }

    if (categoryId) {
      whereCondition.categoryId = categoryId;
    }

    if (minPrice || maxPrice) {
      whereCondition.price = {};
      if (minPrice) whereCondition.price[Op.gte] = parseFloat(minPrice);

      if (maxPrice) whereCondition.price[Op.lte] = parseFloat(maxPrice);
    }

    try {
      const courses = await Course.findAll({
        where: whereCondition,
        limit: Number(limit),
        offset: Number(offset),
        order: [[sortBy, order.toUpperCase()]],
        include: [
          { model: Category, as: "Category", attributes: ["name"] },
          { model: User, as: "Instructor", attributes: ["name", "email"] },
        ],
      });

      return res.json({
        message: RESPONSE_MESSAGE.COURSE.FETCHED,
        courses,
      });
    } catch (error) {
      return res.json({
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
        error,
      });
    }
  } catch (error) {
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error,
    });
  }
};
