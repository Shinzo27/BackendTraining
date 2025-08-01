import { RESPONSE_MESSAGE } from "../Lib/ResponseMessage.js";
import { postUserSchema, updateUserSchema } from "../Lib/ZodSchema.js";
import { Course, Enrollment, User } from "../Models/index.js";
import { Op } from "sequelize";

//Create Student Controller
export const createStudent = async (req, res) => {
  try {
    const parsedPayload = postUserSchema.parse(req.body);
    const user = await User.create({
      name: parsedPayload.name,
      email: parsedPayload.email,
      password: parsedPayload.password,
      role: "student",
    });

    return user
      ? res.json({
          success: true,
          message: RESPONSE_MESSAGE.USER.CREATED,
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

//Get Student Controller
export const getStudentById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id: id, role: "student" },
    attributes: ["id", "name", "email", "role"],
    include: [
      {
        model: Enrollment,
        include: [{ model: Course, attributes: ["title", "price"] }],
        attributes: ["courseId"],
        as: "Enrollments",
      },
    ],
  });

  return user
    ? res.json({
        message: RESPONSE_MESSAGE.USER.FETCHED,
        user,
      })
    : res.json({
        success: false,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
};

//Delete Student Controller
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const user = await User.destroy({
    where: {
      id: id,
      role: "student",
    },
  });

  return user
    ? res.json({
        message: RESPONSE_MESSAGE.USER.DELETED,
      })
    : res.json({
        success: false,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
};

// Update Student Controller
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const parsedPayload = updateUserSchema.parse(body);

    const user = await User.findOne({
      where: {
        id,
        role: "student",
      },
    });

    if (!user)
      return res.json({
        success: false,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    user.name = parsedPayload.name ? parsedPayload.name : user.name;
    user.email = parsedPayload.email ? parsedPayload.email : user.email;
    user.password = parsedPayload.password
      ? parsedPayload.password
      : user.password;

    await user.save();

    return res.json({
      success: true,
      message: RESPONSE_MESSAGE.USER.UPDATED,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error: error,
    });
  }
};

//Get Student Controller
export const getStudents = async (req, res) => {
  const search = req.query.search || "";
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  const sortBy = req.query.sortBy || "id";
  const order = (req.query.order || "desc").toUpperCase();

  const sortValues = ["name", "email", "createdAt", "id"];
  if (!sortValues.includes(sortBy))
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });

  const whereCondition = {
    role: "student",
    [Op.or]: [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ],
  };

  const users = await User.findAll({
    where: whereCondition,
    offset,
    limit,
    order: [[sortBy, order]],
  });

  return res.json({
    message: RESPONSE_MESSAGE.USER.FETCHED,
    users,
  });
};
