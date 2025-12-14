import { db } from "../db/db.js";

// ====================== FLEETS ======================

// Buscar todas as frotas de uma empresa
export const getAllFleets = async (emp_codigo) => {
  const [rows] = await db.query(
    "SELECT * FROM frotas WHERE emp_codigo = ?",
    [emp_codigo]
  );
  return rows;
};

// Buscar frota por ID
export const getFleetById = async (fro_codigo) => {
  const [rows] = await db.query(
    "SELECT * FROM frotas WHERE fro_codigo = ? LIMIT 1",
    [fro_codigo]
  );
  return rows[0] || null;
};

// Adicionar frota
export const addFleet = async (fleetData) => {
  const { fro_nome, fro_descricao, fro_created_at, fro_updated_at, emp_codigo } = fleetData;
  const [result] = await db.query(
    "INSERT INTO frotas (fro_nome, fro_descricao, fro_created_at, fro_updated_at, emp_codigo) VALUES (?, ?, ?, ?, ?)",
    [fro_nome, fro_descricao, fro_created_at, fro_updated_at, emp_codigo]
  );
  return { fro_codigo: result.insertId, ...fleetData };
};

// Atualizar frota
export const updateFleet = async (fro_codigo, updateData) => {
  const fields = [];
  const values = [];

  for (const key in updateData) {
    fields.push(`${key} = ?`);
    values.push(updateData[key]);
  }

  fields.push("fro_updated_at = ?");
  values.push(new Date());
  values.push(fro_codigo);

  const query = `UPDATE frotas SET ${fields.join(", ")} WHERE fro_codigo = ?`;
  const [result] = await db.query(query, values);

  return { message: "Frota atualizada com sucesso", affectedRows: result.affectedRows };
};

// Deletar frota (com transação)
export const deleteFleet = async (fro_codigo) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Atualiza veículos para remover a frota
    await connection.query(
      "UPDATE veiculos SET fro_codigo = NULL WHERE fro_codigo = ?",
      [fro_codigo]
    );

    // Deleta a frota
    const [result] = await connection.query(
      "DELETE FROM frotas WHERE fro_codigo = ?",
      [fro_codigo]
    );

    await connection.commit();
    connection.release();

    return { message: "Frota deletada com sucesso", affectedRows: result.affectedRows };
  } catch (err) {
    await connection.rollback();
    connection.release();
    throw err;
  }
};

// Contar veículos em uma frota
export const countVeiclesInFleet = async (fro_codigo) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) AS total FROM veiculos WHERE fro_codigo = ?",
    [fro_codigo]
  );
  return rows[0].total;
};
