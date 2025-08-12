import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const compare = await bcrypt.compare(password, hashedPassword);

  return compare ? true : false;
};

export const createToken = (
  id: string,
  name: string,
  email: string,
  roleId: number
) => {
  const payload = {
    id: id,
    name: name,
    email: email,
    role: roleId,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || "");

  return token;
};
