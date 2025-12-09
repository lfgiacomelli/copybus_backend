import { loginService } from "../services/authManagerService.js";

export const login = async (req, res) => {
  try {
    const { ges_email, ges_senha } = req.body;

    if (!ges_email || !ges_senha) {
      return res.status(400).json({
        success: false,
        message: "E-mail e senha são obrigatórios"
      });
    }

    const result = await loginService(ges_email, ges_senha);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas"
      });
    }

    res.status(200).json({
      success: true,
      token: result.token,
      manager: result.manager
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erro interno no servidor"
    });
  }
};
