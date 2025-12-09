import {
    createManagerService,
    getManagerByEmailService,
    getManagerByIdService,
    updateManagerService,
    deleteManagerService,
    addCompanyService,
    updateCompanyService,
    getAllCompaniesService,
    verifyEmployeeExistsService,
    deleteCompanyService,
    getCompanyByIdService,
    getAllManagersService

} from "../services/managerService.js";

export const createManager = async (req, res) => {
    try {
        const result = await createManagerService(req.body);
        return res.status(201).json({
            success: true,
            data: result,
            message: "Gestor criado com sucesso!"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao criar gestor"
        });
    }
};

export const getManagerByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) return res.status(400).json({ success: false, message: "E-mail é obrigatório" });
        const manager = await getManagerByEmailService(email);

        if (!manager) return res.status(404).json({ success: false, message: "Gestor não encontrado" });

        return res.status(200).json({ success: true, data: manager });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Erro ao buscar gestor" });
    }
};

export const getManagerById = async (req, res) => {
    try {
        const { ges_codigo } = req.params;
        if (!ges_codigo) return res.status(400).json({ success: false, message: "Código do gestor é obrigatório" });
        const manager = await getManagerByIdService(ges_codigo);

        if (!manager) return res.status(404).json({ success: false, message: "Gestor não encontrado" });

        return res.status(200).json({ success: true, data: manager });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Erro ao buscar gestor" });
    }
};

export const getAllManagers = async (req, res) => {
    try {
        const managers = await getAllManagersService();
        return res.status(200).json({ success: true, data: managers });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Erro ao buscar gestores" });
    }
};

export const updateManager = async (req, res) => {
    try {
        const { ges_codigo } = req.params;
        if (!ges_codigo) return res.status(400).json({ success: false, message: "Código do gestor é obrigatório" });
        const updateData = req.body;

        const result = await updateManagerService(ges_codigo, updateData);

        return res.status(200).json({
            success: true,
            message: result.message
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao atualizar gestor"
        });
    }
};

export const deleteManager = async (req, res) => {
    try {
        const { ges_codigo } = req.params;
        if (!ges_codigo) return res.status(400).json({ success: false, message: "Código do gestor é obrigatório" });
        const result = await deleteManagerService(ges_codigo);

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar gestor"
        });
    }
}

// funções do gestor relacionado às empresas

export const getAllCompanies = async (req, res) => {
    try {
        const result = await getAllCompaniesService();
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar empresas"
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const { emp_codigo } = req.params;
        if (!emp_codigo) return res.status(400).json({ success: false, message: "Código da empresa é obrigatório" });
        const company = await getCompanyByIdService(emp_codigo);

        return res.status(200).json({
            success: true,
            data: company
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar empresa"
        });
    }
}

export const addCompany = async (req, res) => {
    try {
        const result = await addCompanyService(req.body);
        return res.status(201).json({
            success: true,
            data: result,
            message: "Empresa adicionada ao gestor com sucesso!"
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao adicionar empresa ao gestor"
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { emp_codigo } = req.params;
        if (!emp_codigo) return res.status(400).json({ success: false, message: "Código da empresa é obrigatório" });
        const updateData = req.body;

        const result = await updateCompanyService(emp_codigo, updateData);

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao atualizar empresa do gestor"
        });
    }
};

export const verifyEmployeeExists = async (req, res) => {
    try {
        const { emp_codigo } = req.params;
        if (!emp_codigo) return res.status(400).json({ success: false, message: "Código da empresa é obrigatório" });
        const exists = await verifyEmployeeExistsService(emp_codigo);

        return res.status(200).json({
            success: true,
            exists
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao verificar funcionários da empresa"
        });
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const { emp_codigo } = req.params;
        if (!emp_codigo) return res.status(400).json({ success: false, message: "Código da empresa é obrigatório" });
        const result = await deleteCompanyService(emp_codigo);

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar empresa do gestor"
        });
    }
}