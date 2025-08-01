import { checkCourse, checkEnrollment, checkUser } from "../Lib/Checks.js";
import { RESPONSE_MESSAGE } from "../Lib/ResponseMessage.js";
import { Course, Enrollment, User } from "../Models/index.js";

export const getEnrollments = async (req, res) => {
  const enrollments = await Enrollment.findAll({
    attributes: ["id", "createdAt", "updatedAt"],
    include: [
      { model: User, attributes: ["email", "name"] },
      { model: Course, attributes: ["title", "price"] },
    ],
  });

  return res.json({
    message: RESPONSE_MESSAGE.ENROLLMENTS.FETCHED,
    enrollments,
  });
};

export const postEnrollments = async (req, res) => {
  const body = req.body;

  const userExists = await checkUser(body.userId, 'student');

  if (!userExists)
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });

  const courseExists = await checkCourse(body.courseId);

  if (!courseExists)
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });

  const checkEnrollmentExists = await checkEnrollment(body.userId, body.courseId);

  if(checkEnrollmentExists) return res.json({
    message: RESPONSE_MESSAGE.USER.ALREADY_EXISTS
  })

  const enrollment = await Enrollment.create({
    studentId: body.userId,
    courseId: body.courseId,
  });

  return enrollment
    ? res.json({
        message: RESPONSE_MESSAGE.ENROLLMENTS.CREATED,
      })
    : res.json({
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });
};

export const deleteEnrollment = async (req, res) => {
  const { id } = req.params;

  const enrollment = await Enrollment.destroy({
    where: { id },
  });

  return enrollment
    ? res.json({
        message: RESPONSE_MESSAGE.ENROLLMENTS.DELETED,
      })
    : res.json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
};
