import { loginService } from "../services/authUserService.js";

export const login = async (req, res) => {
  try {
    const { usu_email, usu_senha } = req.body;

    if (!usu_email || !usu_senha) {
      return res.status(400).json({
        success: false,
        message: "E-mail e senha são obrigatórios"
      });
    }

    const result = await loginService(usu_email, usu_senha);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas"
      });
    }

    res.status(200).json({
      success: true,
      token: result.token,
      user: result.user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erro interno no servidor"
    });
  }
};
