import { getUserByIdService, createUserService, updateUserService, deleteUserService, getAllUsersService } from "../services/userService.js";

export const getUserByIdController = async (req, res) => {
    try {
        const { usu_codigo } = req.params;
        if (!usu_codigo) {
            return res.status(400).json({
                success: false,
                message: "Código do usuário é obrigatório."
            });
        }
        const user = await getUserByIdService(usu_codigo);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado."
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro interno no servidor."
        });
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const { emp_codigo } = req.params;
        if (!emp_codigo) {
            return res.status(400).json({
                success: false,
                message: "Código da empresa é obrigatório."
            });
        }
        const users = await getAllUsersService(emp_codigo);

        if (!users) {
            return res.status(404).json({
                success: false,
                message: "Funcionários não encontrados."
            });
        }

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro interno no servidor."
        });
    }
};

export const createUserController = async (req, res) => {
    try {
        const newUser = await createUserService(req.body);

        return res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso!",
            data: newUser
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao criar usuário"
        });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const { usu_codigo } = req.params;
        if (!usu_codigo) return res.status(400).json({ success: false, message: "Código do usuário é obrigatório" });
        const updateData = req.body;

        const result = await updateUserService(usu_codigo, updateData);

        return res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao atualizar usuário"
        });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        const { usu_codigo } = req.params;
        if (!usu_codigo) return res.status(400).json({ success: false, message: "Código do usuário é obrigatório" });
        const result = await deleteUserService(usu_codigo);

        return res.status(200).json({
            success: true,
            message: result.message
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar usuário"
        })
    }
}