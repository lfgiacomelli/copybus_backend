import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findManagerByEmail } from "../repositories/managerRepository.js";

export const loginService = async (ges_email, senha) => {
  const manager = await findManagerByEmail(ges_email);

  if (!manager) return null;

  const hash = manager.ges_senha.replace(/^\$2y/, "$2a");

  const isMatch = await bcrypt.compare(senha, hash);

  if (!isMatch) return null;

  const token = jwt.sign(
    { id: manager.ges_codigo, email: manager.ges_email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  const { ges_senha, ...managerWithoutPassword } = manager;

  return { token, manager: managerWithoutPassword };
};
