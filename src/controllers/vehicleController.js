import { addKilometragemService, createVehicleService, deleteVehicleService, getAllVehiclesService, getVehicleByIdService, updateVehicleService } from "../services/vehicleService.js";

export const getAllVehicles = async (req, res) => {
    try {
        const { emp_codigo } = req.params;
        if (!emp_codigo) return res.status(400).json({ success: false, message: "Código da empresa é obrigatório" });
        const vehicles = await getAllVehiclesService(emp_codigo);
        return res.status(200).json({
            success: true,
            data: vehicles
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar veículos"
        });
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const { vei_codigo } = req.params;
        if (!vei_codigo) return res.status(400).json({ success: false, message: "Código do veículo é obrigatório" });
        const vehicle = await getVehicleByIdService(vei_codigo);
        return res.status(200).json({
            success: true,
            data: vehicle
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar veículo"
        });
    }
};

export const createVehicle = async (req, res) => {
    try {
        const data = req.body;
        const newVehicle = await createVehicleService(data);
        return res.status(201).json({
            success: true,
            data: newVehicle
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao criar veículo"
        });
    }
}
export const updateVehicle = async (req, res) => {
    try {
        const { vei_codigo } = req.params;
        if (!vei_codigo) return res.status(400).json({ success: false, message: "Código do veículo é obrigatório" });
        const updateData = req.body;
        const updatedVehicle = await updateVehicleService(vei_codigo, updateData);
        return res.status(200).json({
            success: true,
            data: updatedVehicle
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao atualizar veículo"
        });
    }
};
export const deleteVehicle = async (req, res) => {
    try {
        const { vei_codigo } = req.params;
        if (!vei_codigo) return res.status(400).json({ success: false, message: "Código do veículo é obrigatório" });
        const result = await deleteVehicleService(vei_codigo);
        return res.status(200).json({
            success: true,
            message: result.message
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar veículo"
        });
    }
};

export const addKilometragem = async (req, res) => {
    try {
        const { vei_codigo } = req.params;
        if (!vei_codigo) return res.status(400).json({ success: false, message: "Código do veículo é obrigatório" });
        const { km } = req.body;
        if (!km) return res.status(400).json({ success: false, message: "Quilometragem é obrigatória" });
        const result = await addKilometragemService(vei_codigo, km);
        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao adicionar quilometragem"
        });
    }
};

