import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "./prisma";

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

const max = 100000;
const min = 999999;

export const generateOtp = async () => {
  const otp = Math.floor(Math.random() * (max - min)) + min;
  const hashedPassword = await bcrypt.hash(otp.toString(), 10);

  return { otp, hashedPassword };
};

export const createPasswordResetToken = async (
  userId: string,
  tokenHash: string
) => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  const createToken = await prisma.passwordResetToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  if (!createToken) return false;

  return true;
};

export const updatePasswordResetToken = async (
  id: number,
  tokenHash: string
) => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  const updateToken = await prisma.passwordResetToken.update({
    where: {
      id,
    },
    data: {
      tokenHash,
      expiresAt,
    },
  });

  if (!updateToken) return false;

  return true;
};

export const verifyHashedOtp = async (otp: string, hashedOtp: string) => {
  const verifyHash = await bcrypt.compare(otp, hashedOtp);

  if (verifyHash) {
    return true;
  } else {
    return false;
  }
};

export const generateTempToken = async (payload: {
  hashToken: string,
  userId: string;
  expiresAt: Date
}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "10m",
  });

  return token;
};

export const verifyToken = async(token: string) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

  return verify
}