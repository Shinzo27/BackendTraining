import db from "../Lib/db.js";
import User from "../Models/User.js";

export const insertData = async (name, email, password) => {
  await db.sync();
  console.log(name, email, password);

  const user = await User.create({
    name,
    email,
    password
  })

  return {
    message: "User Created!",
  };
};
