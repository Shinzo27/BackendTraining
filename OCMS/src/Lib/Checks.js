import { Category, Course, User } from "../Models/index.js"

export const checkCategory = async(id) => {
    const category = await Category.findByPk(id)

    return category ? true : false
}

export const checkUser = async (id, role) => {
  const checkUserExists = await User.findOne({
    where: {
      id,
      role: role,
    },
  });

  return checkUserExists ? true : false;
};

export const checkCourse = async (id) => {
  const checkCourseExists = await Course.findByPk(id);

  return checkCourseExists ? true : false;
};