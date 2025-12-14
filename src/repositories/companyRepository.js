import { db } from "../db/db.js";

// Buscar empresa por ID
export const getCompanyById = async (emp_codigo) => {
  const [rows] = await db.query(
    "SELECT * FROM empresas WHERE emp_codigo = ? LIMIT 1",
    [emp_codigo]
  );
  return rows[0] || null;
};

// Atualizar empresa
export const updateCompany = async (emp_codigo, updateData) => {
  const fields = [];
  const values = [];

  for (const key in updateData) {
    fields.push(`${key} = ?`);
    values.push(updateData[key]);
  }

  // Atualiza a data de modificação
  fields.push("emp_updated_at = ?");
  values.push(new Date());

  // ID da empresa no WHERE
  values.push(emp_codigo);

  const query = `UPDATE empresas SET ${fields.join(", ")} WHERE emp_codigo = ?`;

  const [result] = await db.query(query, values);

  return {
    message: "Empresa atualizada com sucesso",
    affectedRows: result.affectedRows,
  };
};
