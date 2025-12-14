import { db } from "../db/db.js";

// ====================== DRIVERS ======================

// Buscar todos os motoristas de uma empresa
export const getAllDrivers = async (emp_codigo) => {
  const [rows] = await db.query(
    "SELECT * FROM motoristas WHERE emp_codigo = ?",
    [emp_codigo]
  );
  return rows;
};

// Buscar motorista por ID
export const getDriverById = async (mot_codigo) => {
  const [rows] = await db.query(
    "SELECT * FROM motoristas WHERE mot_codigo = ? LIMIT 1",
    [mot_codigo]
  );
  return rows[0] || null;
};

// Adicionar motorista
export const addDriver = async (driverData) => {
  const { mot_nome, mot_cpf, mot_cnh, mot_email, mot_status, mot_created_at, mot_updated_at, emp_codigo } = driverData;

  const [result] = await db.query(
    `INSERT INTO motoristas 
      (mot_nome, mot_cpf, mot_cnh, mot_email, mot_status, mot_created_at, mot_updated_at, emp_codigo) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [mot_nome, mot_cpf, mot_cnh, mot_email, mot_status, mot_created_at, mot_updated_at, emp_codigo]
  );

  return { mot_codigo: result.insertId, ...driverData };
};

// Atualizar motorista
export const updateDriver = async (mot_codigo, updateData) => {
  const fields = [];
  const values = [];

  for (const key in updateData) {
    fields.push(`${key} = ?`);
    values.push(updateData[key]);
  }

  fields.push("mot_updated_at = ?");
  values.push(new Date());
  values.push(mot_codigo);

  const query = `UPDATE motoristas SET ${fields.join(", ")} WHERE mot_codigo = ?`;
  const [result] = await db.query(query, values);

  return { message: "Motorista atualizado com sucesso", affectedRows: result.affectedRows };
};

export const deleteDriver = async (mot_codigo) => {
  const [result] = await db.query(
    "DELETE FROM motoristas WHERE mot_codigo = ?",
    [mot_codigo]
  );

  return { message: "Motorista deletado com sucesso", affectedRows: result.affectedRows };
};
