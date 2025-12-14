import { db } from "../db/db.js";

export const getAllVehicles = async (emp_codigo) => {
  const [rows] = await db.query(
    `
    SELECT 
      v.*,
      f.fro_nome,
      e.emp_nome
    FROM veiculos v
    LEFT JOIN frotas f 
      ON v.fro_codigo = f.fro_codigo
    LEFT JOIN empresas e ON v.emp_codigo = e.emp_codigo
      WHERE v.emp_codigo = ?
    `,
    [emp_codigo]
  );

  return rows;
};


export const getVehicleById = async (vei_codigo) => {
  const [rows] = await db.query(
    "SELECT v.*, e.emp_nome, f.fro_nome FROM veiculos v LEFT JOIN empresas e ON v.emp_codigo = e.emp_codigo LEFT JOIN frotas f ON v.fro_codigo = f.fro_codigo WHERE vei_codigo = ? LIMIT 1",
    [vei_codigo]
  );
  return rows[0] || null;
};

export const addVehicle = async (vehicleData) => {
  const {
    vei_placa,
    vei_modelo,
    vei_ano,
    vei_status,
    vei_prefixo,
    vei_odometro,
    vei_created_at,
    vei_updated_at,
    emp_codigo,
    fro_codigo,
    vei_imagem
  } = vehicleData;

  const [result] = await db.query(
    `INSERT INTO veiculos 
      (vei_placa, vei_modelo, vei_ano, vei_status, vei_prefixo, vei_odometro, vei_created_at, vei_updated_at, emp_codigo, fro_codigo, vei_imagem)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [vei_placa, vei_modelo, vei_ano, vei_status, vei_prefixo, vei_odometro, vei_created_at, vei_updated_at, emp_codigo, fro_codigo, vei_imagem]
  );

  return { vei_codigo: result.insertId, ...vehicleData };
};

export const updateVehicle = async (vei_codigo, updateData) => {
  const fields = [];
  const values = [];

  for (const key in updateData) {
    fields.push(`${key} = ?`);
    values.push(updateData[key]);
  }

  values.push(vei_codigo);

  const sql = `UPDATE veiculos SET ${fields.join(", ")} WHERE vei_codigo = ?`;
  const [result] = await db.query(sql, values);

  return { message: "Veículo atualizado com sucesso", affectedRows: result.affectedRows };
};

export const addKilometragem = async (vei_codigo, km) => {
  vei_codigo = parseInt(vei_codigo);
  km = parseInt(km);

  if (vei_codigo <= 0 || km <= 0) return false;

  const sql = `
    UPDATE veiculos
    SET vei_odometro = vei_odometro + ?,
        vei_updated_at = ?
    WHERE vei_codigo = ?
  `;

  const updated_at = new Date();
  const [result] = await db.query(sql, [km, updated_at, vei_codigo]);

  return result.affectedRows > 0;
};

export const getVehicleInfo = async (emp_codigo) => {
  const [rows] = await db.query(
    "SELECT * FROM veiculos WHERE emp_codigo = ? ORDER BY vei_codigo LIMIT 8",
    [emp_codigo]
  );
  return rows;
};

export const deleteVehicle = async (vei_codigo) => {
  const [result] = await db.query(
    "DELETE FROM veiculos WHERE vei_codigo = ?",
    [vei_codigo]
  );

  return { message: "Veículo deletado com sucesso", affectedRows: result.affectedRows };
};
