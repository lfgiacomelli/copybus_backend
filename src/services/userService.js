import { findUserById, getAllUsers, addUser, updateUser, deleteUser } from "../repositories/userRepository.js";

import bcrypt from "bcrypt";

export const getUserByIdService = async (usu_codigo) => {
    const user = await findUserById(usu_codigo);
    return user;
};

export const createUserService = async (data) => {
    const hashedPassword = await bcrypt.hash(data.usu_senha, 10);

    const userData = {
        ...data,
        usu_senha: hashedPassword,
        usu_created_at: new Date(),
        usu_updated_at: new Date(),
    };

    return await addUser(userData);
};

export const getAllUsersService = async (emp_codigo) => {
    return await getAllUsers(emp_codigo);
}

export const updateUserService = async (usu_codigo, updateData) => {
    return await updateUser(usu_codigo, updateData);
};

export const deleteUserService = async (usu_codigo) => {
    return await deleteUser(usu_codigo);
}