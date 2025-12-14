import { addKilometragem, addVehicle, deleteVehicle, getAllVehicles, getVehicleById, getVehicleInfo, updateVehicle } from "../repositories/vehicleRepository.js";

export const getAllVehiclesService = async (emp_codigo) => {
    return await getAllVehicles(emp_codigo);
};
export const getVehicleByIdService = async (vei_codigo) => {
    return await getVehicleById(vei_codigo);
};

export const createVehicleService = async (vehicleData) => {
    const newVehicleData = {
        ...vehicleData,
        vei_created_at: new Date(),
        vei_updated_at: new Date(),
    };
    return await addVehicle(newVehicleData);
};

export const updateVehicleService = async (vei_codigo, updateData) => {
    return await updateVehicle(vei_codigo, updateData);
};

export const deleteVehicleService = async (vei_codigo) => {
    return await deleteVehicle(vei_codigo);
};

export const addKilometragemService = async (vei_codigo, kmData) => {
    return await addKilometragem(vei_codigo, kmData);
};
