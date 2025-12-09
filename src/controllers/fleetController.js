import { countVeiclesInFleetService, createFleetService, deleteFleetService, getAllFleetsService, getFleetByIdService, updateFleetService } from "../services/fleetService.js";

export const getAllFleets = async (req, res) => {
    try {
        const { emp_codigo } = req.params;
        if (!emp_codigo) return res.status(400).json({ success: false, message: "Código da empresa é obrigatório" });
        const fleets = await getAllFleetsService(emp_codigo);
        return res.status(200).json({
            success: true,
            data: fleets
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar frotas"
        });
    }
};

export const getFleetById = async (req, res) => {
    try {
        const { fro_codigo } = req.params;
        if (!fro_codigo) return res.status(400).json({ success: false, message: "Código da frota é obrigatório" });
        const fleet = await getFleetByIdService(fro_codigo);
        return res.status(200).json({
            success: true,
            data: fleet
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar frota"
        });
    }
};

export const createFleet = async (req, res) => {
    try {
        const data = req.body;
        const newFleet = await createFleetService(data);
        return res.status(201).json({
            success: true,
            data: newFleet
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao criar frota"
        });
    }
};

export const updateFleet = async (req, res) => {
    try {
        const { fro_codigo } = req.params;
        if (!fro_codigo) return res.status(400).json({ success: false, message: "Código da frota é obrigatório" });
        const updateData = req.body;
        const result = await updateFleetService(fro_codigo, updateData);
        return res.status(200).json({
            success: true,
            message: result.message
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao atualizar frota"
        });
    }
};

export const deleteFleet = async (req, res) => {
    try {
        const { fro_codigo } = req.params;
        if (!fro_codigo) return res.status(400).json({ success: false, message: "Código da frota é obrigatório" });
        await deleteFleetService(fro_codigo);
        return res.status(200).json({
            success: true,
            message: "Frota deletada com sucesso"
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message || "Erro ao deletar frota"
        });
    }
};
export const countVeiclesInFleet = async (req, res) => {
    try {
        const { fro_codigo } = req.params;
        if (!fro_codigo) return res.status(400).json({ success: false, message: "Código da frota é obrigatório" });
        const count = await countVeiclesInFleetService(fro_codigo);
        return res.status(200).json({
            success: true,
            data: { vehicleCount: count }
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Erro ao contar veículos na frota"
        });
    }
};