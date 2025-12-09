import {addFleet, countVeiclesInFleet, deleteFleet, getAllFleets, getFleetById, updateFleet} from "../repositories/fleetRepository.js";

export const getAllFleetsService = async (emp_codigo) => {
    return await getAllFleets(emp_codigo);
}

export const getFleetByIdService = async (fro_codigo) => {
    return await getFleetById(fro_codigo);
}

export const createFleetService = async (data) => {
    const fleetData = {
        ...data,
        fro_created_at: new Date(),
        fro_updated_at: new Date(),
    };
    return await addFleet(fleetData);
};

export const updateFleetService = async (fro_codigo, updateData) => {
    return await updateFleet(fro_codigo, updateData);
};

export const deleteFleetService = async (fro_codigo) => {
    const vehicleCount = await countVeiclesInFleet(fro_codigo);
    if (vehicleCount > 0) {
        throw new Error("Não é possível deletar a frota pois existem veículos associados a ela.");
    }
    return await deleteFleet(fro_codigo);
};

export const countVeiclesInFleetService = async (fro_codigo) => {
    return await countVeiclesInFleet(fro_codigo);
}