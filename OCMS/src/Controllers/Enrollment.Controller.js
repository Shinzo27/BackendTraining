import { checkIsEnrollmentValid } from "../Lib/Checks.js";
import { RESPONSE_MESSAGE } from "../Lib/ResponseMessage.js";
import { Course, Enrollment, User } from "../Models/index.js";

//Get Enrollments Controller
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

//Create Enrollment Controller
export const postEnrollments = async (req, res) => {
  const body = req.body;

  //Will check if user exists, course exists and enrollment is not already exists
  const isValid = await checkIsEnrollmentValid(body.userId, 'student', 'id', body.courseId)

  if(!isValid) return res.json({
    message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST
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

//Delete Enrollment Controller
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
