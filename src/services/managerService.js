import { findManagerByEmail, getAllManagers, addManager, updateManager, deleteManager, addCompanyRepository, getAllCompanies, getManagerById, updateCompany, verifyEmployeeExists, getCompanyById, deleteCompany } from "../repositories/managerRepository.js";

import bcrypt from "bcrypt";

import { supabase } from "../db/supabase.js";

export const getManagerByEmailService = async (ges_email) => {
    return await findManagerByEmail(ges_email);
};

export const getAllManagersService = async () => {
    return await getAllManagers();
}

export const getManagerByIdService = async (ges_codigo) => {
    return await getManagerById(ges_codigo);
};

export const createManagerService = async (managerData) => {
    const hashedPassword = await bcrypt.hash(managerData.ges_senha, 10);

    const updatedManagerData = {
        ...managerData,
        ges_senha: hashedPassword,
        ges_created_at: new Date(),
        ges_updated_at: new Date()
    };

    return await addManager(updatedManagerData);
};

export const updateManagerService = async (ges_codigo, updateData) => {
    if (updateData.ges_senha) {
        const hashedPassword = await bcrypt.hash(updateData.ges_senha, 10);
        updateData.ges_senha = hashedPassword;
    }
    return await updateManager(ges_codigo, updateData);
};

export const deleteManagerService = async (ges_codigo) => {
    if (!ges_codigo) throw new Error("Código do gestor é obrigatório para exclusão.");
    return await deleteManager(ges_codigo);
}

// funções do gestor relacionado às empresas

export const getAllCompaniesService = async () => {
    return await getAllCompanies();
}

export const getCompanyByIdService = async (emp_codigo) => {
    return await getCompanyById(emp_codigo);
};

export const addCompanyService = async (companyData, file) => {
    let fileUrl = null;

    if (file) {
        const filename = `${Date.now()}-${file.originalname}`;

        const { error } = await supabase.storage
            .from("empresas")
            .upload(filename, file.buffer, {
                contentType: file.mimetype,
                upsert: false,
            });

        if (error) throw new Error("Erro ao enviar imagem");

        fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/empresas/${filename}`;
    }

    const newCompany = await addCompanyRepository(companyData, fileUrl);

    return newCompany;
};


export const updateCompanyService = async (emp_codigo, updateData) => {
    return await updateCompany(emp_codigo, updateData);
};

export const verifyEmployeeExistsService = async (emp_codigo) => {
    return await verifyEmployeeExists(emp_codigo);
};

export const deleteCompanyService = async (emp_codigo) => {
    return await deleteCompany(emp_codigo);
};