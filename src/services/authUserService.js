import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../repositories/userRepository.js";

export const loginService = async (email, senha) => {
  const user = await findUserByEmail(email);


  const isMatch = await bcrypt.compare(senha, user.usu_senha);

  if (!isMatch) return null;

  const token = jwt.sign(
    { id: user.usu_codigo, email: user.usu_email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  delete user.usu_senha;

  return { token, user };
};