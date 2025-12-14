import { db } from "../db/db.js";


export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE usu_email = ?",
    [email]
  );
  return rows[0] || null;
};

export const findUserById = async (usu_codigo) => {
  const [rows] = await db.query(
    `SELECT u.*, e.emp_nome, e.emp_logo 
     FROM usuarios u 
     LEFT JOIN empresas e ON e.emp_codigo = u.emp_codigo 
     WHERE u.usu_codigo = ? 
     LIMIT 1`,
    [usu_codigo]
  );
  return rows[0] || null;
};

export const getAllUsers = async (emp_codigo) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE emp_codigo = ?",
    [emp_codigo]
  );

  return rows;
}


export const addUser = async (userData) => {
  const { usu_nome, usu_email, usu_senha, usu_created_at, usu_updated_at, emp_codigo } = userData;

  const [result] = await db.query(
    `INSERT INTO usuarios 
      (usu_nome, usu_email, usu_senha, usu_created_at, usu_updated_at, emp_codigo)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [usu_nome, usu_email, usu_senha, usu_created_at, usu_updated_at, emp_codigo]
  );

  return { usu_codigo: result.insertId, ...userData };
};

export const updateUser = async (usu_codigo, updateData) => {
  const allowedFields = [
    "usu_nome",
    "usu_email",
    "usu_senha",
    "usu_status",
  ];

  const fields = [];
  const values = [];

  for (const key of allowedFields) {
    if (updateData[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    }
  }

  if (!fields.length) {
    return { message: "Nenhum dado para atualizar", affectedRows: 0 };
  }

  fields.push("usu_updated_at = ?");
  values.push(new Date());
  values.push(usu_codigo);

  const query = `
    UPDATE usuarios
    SET ${fields.join(", ")}
    WHERE usu_codigo = ?
  `;

  const [result] = await db.query(query, values);

  return {
    message: "Usuário atualizado com sucesso",
    affectedRows: result.affectedRows,
  };
};


export const deleteUser = async (usu_codigo) => {
  const [result] = await db.query(
    "DELETE FROM usuarios WHERE usu_codigo = ?",
    [usu_codigo]
  );

  return { message: "Usuário deletado com sucesso", affectedRows: result.affectedRows };
};


