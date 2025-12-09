import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findManagerByEmail } from "../repositories/managerRepository.js";

export const loginService = async (email, senha) => {
  const manager = await findManagerByEmail(email);

  const isMatch = await bcrypt.compare(senha, manager.ges_senha);

  if (!isMatch) return null; 

  const token = jwt.sign(
    { id: manager.ges_codigo, email: manager.ges_email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  delete manager.ges_senha;

  return { token, manager };
};