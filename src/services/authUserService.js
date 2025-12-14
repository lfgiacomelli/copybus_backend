import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../repositories/userRepository.js";

export const loginService = async (email, senha) => {
  const user = await findUserByEmail(email);

  if (!user) return null;

  const hash = user.usu_senha.replace(/^\$2y/, "$2a");

  const isMatch = await bcrypt.compare(senha, hash);
  if (!isMatch) return null;

  const token = jwt.sign(
    { id: user.usu_codigo, email: user.usu_email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  const { usu_senha, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};
