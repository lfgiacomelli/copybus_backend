import { getCompanyByIdService, updateCompanyService } from "../services/companyService.js";

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
            message: "Erro ao atualizar empresa"
        });
    }
}