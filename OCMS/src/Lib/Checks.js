import { Category, Course, Enrollment, User } from "../Models/index.js";

// Will check if category exists or not
export const checkCategory = async (type, value) => {
  const category = await Category.findOne({
    where: {
      [type]: value,
    },
  });

  return category ? true : false;
};

// Will check if user exists or not
export const checkUser = async (id, role) => {
  const checkUserExists = await User.findOne({
    where: {
      id,
      role: role,
    },
  });

  return checkUserExists ? true : false;
};

// Will check if course exists or not
const checkCourse = async (type, value) => {
  const checkCourseExists = await Course.findOne({
    where: {
      [type]: value,
    },
  });

  return checkCourseExists ? true : false;
};

// Will check if enrollment exists or not
const checkEnrollment = async (studentId, courseId) => {
  const checkEnrollmentExists = await Enrollment.findOne({
    where: {
      studentId,
      courseId,
    },
  });

  return checkEnrollmentExists ? true : false;
};

// Will check if another course is valid to create or not
export const checkIsCourseValid = async (
  userId,
  role,
  categoryType,
  categortValue,
  courseType,
  courseTitle
) => {
  //Will check if instructor exists or not
  const checkUserExists = await checkUser(userId, role);

  if (!checkUserExists) return false;

  //Will check if category exists or not
  const checkCategoryExists = await checkCategory(categoryType, categortValue);

  if (!checkCategoryExists) return false;

  const checkIfCourseExists = await checkCourse(courseType, courseTitle);

  if (checkIfCourseExists) return false;

  return true;
};

// Will check if another enrollment is valid to create or not
export const checkIsEnrollmentValid = async (userId, role, courseType, courseValue) => {
  const checkUserExists = await checkUser(userId, role);

  if(!checkUserExists) return false;

  const checkCourseExists = await checkCourse(courseType, courseValue)

  if(!checkCourseExists) return false;

  const checkEnrollmentExists = await checkEnrollment(userId, courseValue)

  if(checkEnrollmentExists) return false;

  return true;
}