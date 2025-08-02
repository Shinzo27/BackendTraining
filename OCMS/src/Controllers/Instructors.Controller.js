import { RESPONSE_MESSAGE } from "../Lib/ResponseMessage.js";
import { postUserSchema, updateUserSchema } from "../Lib/ZodSchema.js";
import { Course, User } from "../Models/index.js";

//Get Instructor By Id Controller
export const getInstructorById = async (req, res) => {
  const { id } = req.params;

  const instructor = await User.findOne({
    where: {
      id,
      role: "instructor",
    },
    attributes: ["id", "name", "email"],
    include: [{ model: Course, as: "Instructor", attributes: ["title"] }],
  });

  return instructor
    ? res.json({
        message: RESPONSE_MESSAGE.USER.FETCHED,
        instructor,
      })
    : res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
};

//List all instructors Controller
export const getAllInstructors = async (req, res) => {
  const instructors = await User.findAll({
    where: {
      role: "instructor",
    },
  });

  return res.json({
    instructors,
  });
};

//Create New Instructor Controller
export const createInstructor = async (req, res) => {
  try {
    const parsedPayload = postUserSchema.parse(req.body);

    const instructor = await User.create({
      name: parsedPayload.name,
      email: parsedPayload.email,
      password: parsedPayload.password,
      role: "instructor",
    });

    return instructor
      ? res.json({
          message: RESPONSE_MESSAGE.USER.CREATED,
        })
      : res.json({
          message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
        });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.json({
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
        error: error.issues,
      });
    }
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      error: error,
    });
  }
};

//Update Instructor Controller
export const updateInstructor = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const parsedPayload = updateUserSchema.parse(body);

    const instructor = await User.findOne({
      where: {
        id,
        role: "instructor",
      },
    });

    if (!instructor)
      return res.json({
        success: false,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    instructor.name = parsedPayload.name ? parsedPayload.name : instructor.name;
    instructor.email = parsedPayload.email
      ? parsedPayload.email
      : instructor.email;
    instructor.password = parsedPayload.password
      ? parsedPayload.password
      : instructor.password;

    await instructor.save();

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

//Delete Instructor Controller
export const deleteInstructor = async (req, res) => {
  const { id } = req.params;

  const instructor = await User.destroy({
    where: {
      id,
      role: "instructor",
    },
  });

  return instructor
    ? res.json({
        message: RESPONSE_MESSAGE.USER.DELETED,
      })
    : res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
};
