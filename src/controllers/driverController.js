import { createDriverService, deleteDriverService, getAllDriversService, getDriverByIdService, updateDriverService } from "../services/driverService.js";

export const getAllDrivers = async (req, res) => {
    try {
        const { emp_codigo } = req.params;
        if (!emp_codigo) return res.status(400).json({ success: false, message: "Código da empresa é obrigatório" });
        const drivers = await getAllDriversService(emp_codigo);
        return res.status(200).json({
            success: true,
            data: drivers
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar motoristas"
        });
    }
};

export const getDriverById = async (req, res) => {
    try {
        const { mot_codigo } = req.params;
        if (!mot_codigo) return res.status(400).json({ success: false, message: "Código do motorista é obrigatório" });
        const driver = await getDriverByIdService(mot_codigo);
        return res.status(200).json({
            success: true,
            data: driver
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar motorista"
        });
    }
};

export const createDriver = async (req, res) => {
    try {
        const data = req.body;
        const newDriver = await createDriverService(data);
        return res.status(201).json({
            success: true,
            data: newDriver
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao criar motorista"
        });
    }
};
export const updateDriver = async (req, res) => {
    try {
        const { mot_codigo } = req.params;
        if (!mot_codigo) return res.status(400).json({ success: false, message: "Código do motorista é obrigatório" });
        const updateData = req.body;
        const result = await updateDriverService(mot_codigo, updateData);
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao atualizar motorista"
        });
    }
};
export const deleteDriver = async (req, res) => {
    try {
        const { mot_codigo } = req.params;
        if (!mot_codigo) return res.status(400).json({ success: false, message: "Código do motorista é obrigatório" });
        const result = await deleteDriverService(mot_codigo);
        return res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar motorista"
        });
    }
};
