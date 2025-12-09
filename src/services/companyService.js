import { getCompanyById, updateCompany } from "../repositories/companyRepository.js";

export const getCompanyByIdService = async (emp_codigo) => {
    return await getCompanyById(emp_codigo);
}

export const updateCompanyService = async (emp_codigo, updateData) => {
    return await updateCompany(emp_codigo, updateData);
}