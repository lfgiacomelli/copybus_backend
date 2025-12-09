
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authUserMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token não fornecido ou mal formatado."
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Salva os dados do usuário no request para uso futuro
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "user"
    };

    next(); // Continua para a rota
  } catch (err) {
    console.error(err);

    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado."
    });
  }
};

