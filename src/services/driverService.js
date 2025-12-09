import {addDriver, deleteDriver, getAllDrivers, getDriverById, updateDriver} from "../repositories/driverRepository.js";

export const getAllDriversService = async (emp_codigo) => {
    return await getAllDrivers(emp_codigo);
}

export const getDriverByIdService = async (mot_codigo) => {
    return await getDriverById(mot_codigo);
}

export const createDriverService = async (driverData) => {
    const newDriverData = {
        ...driverData,
        mot_created_at: new Date(),
        mot_updated_at: new Date(),
    };
    return await addDriver(newDriverData);
}

export const updateDriverService = async (mot_codigo, updateData) => {
    return await updateDriver(mot_codigo, updateData);
}

export const deleteDriverService = async (mot_codigo) => {
    return await deleteDriver(mot_codigo);
}