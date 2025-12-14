import { db } from "../db/db.js"; 

export const findManagerByEmail = async (ges_email) => {
  const [rows] = await db.query(
    "SELECT * FROM gestores WHERE ges_email = ? LIMIT 1",
    [ges_email]
  );
  return rows[0] || null;
};

export const getAllManagers = async () => {
  const [rows] = await db.query("SELECT * FROM gestores");
  return rows;
};

export const getManagerById = async (ges_codigo) => {
  const [rows] = await db.query(
    "SELECT * FROM gestores WHERE ges_codigo = ? LIMIT 1",
    [ges_codigo]
  );
  return rows[0] || null;
};

export const addManager = async (managerData) => {
  const { ges_nome, ges_email, ges_senha, ges_status, ges_created_at, ges_updated_at } = managerData;
  const [result] = await db.query(
    "INSERT INTO gestores (ges_nome, ges_email, ges_senha, ges_status, ges_created_at, ges_updated_at) VALUES (?, ?, ?, ?, ?, ?)",
    [ges_nome, ges_email, ges_senha, ges_status, ges_created_at, ges_updated_at]
  );
  return { ges_codigo: result.insertId, ...managerData };
};

export const updateManager = async (ges_codigo, updateData) => {
  const fields = [];
  const values = [];

  for (const key in updateData) {
    fields.push(`${key} = ?`);
    values.push(updateData[key]);
  }

  fields.push("ges_updated_at = ?");
  values.push(new Date());
  values.push(ges_codigo);

  const query = `UPDATE gestores SET ${fields.join(", ")} WHERE ges_codigo = ?`;
  const [result] = await db.query(query, values);

  return { message: "Gestor atualizado com sucesso", affectedRows: result.affectedRows };
};

export const deleteManager = async (ges_codigo) => {
  const [result] = await db.query("DELETE FROM gestores WHERE ges_codigo = ?", [ges_codigo]);
  return { message: "Gestor deletado com sucesso", affectedRows: result.affectedRows };
};


export const getAllCompanies = async () => {
  const [rows] = await db.query("SELECT * FROM empresas");
  return rows;
};

export const getCompanyById = async (emp_codigo) => {
  const [rows] = await db.query("SELECT * FROM empresas WHERE emp_codigo = ? LIMIT 1", [emp_codigo]);
  return rows[0] || null;
};

export const addCompanyRepository = async (companyData, fileUrl) => {
  const {
    emp_nome,
    emp_cnpj,
    emp_telefone,
    emp_endereco,
    emp_email,
  } = companyData;

  const [result] = await db.query(
    `INSERT INTO empresas 
     (emp_nome, emp_cnpj, emp_telefone, emp_endereco, emp_email, emp_logo)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      emp_nome,
      emp_cnpj,
      emp_telefone,
      emp_endereco,
      emp_email,
      fileUrl
    ]
  );

  return {
    emp_codigo: result.insertId,
    ...companyData,
    emp_logo: fileUrl
  };
};

export const updateCompany = async (emp_codigo, updateData) => {
  const fields = [];
  const values = [];

  for (const key in updateData) {
    fields.push(`${key} = ?`);
    values.push(updateData[key]);
  }

  fields.push("emp_updated_at = ?");
  values.push(new Date());
  values.push(emp_codigo);

  const query = `UPDATE empresas SET ${fields.join(", ")} WHERE emp_codigo = ?`;
  const [result] = await db.query(query, values);

  return { message: "Empresa atualizada com sucesso", affectedRows: result.affectedRows };
};

export const verifyEmployeeExists = async (emp_codigo) => {
  const [rows] = await db.query("SELECT COUNT(*) AS total FROM usuarios WHERE emp_codigo = ?", [emp_codigo]);
  return rows[0].total > 0;
};

export const deleteCompany = async (emp_codigo) => {
  const [result] = await db.query("DELETE FROM empresas WHERE emp_codigo = ?", [emp_codigo]);
  return { message: "Empresa deletada com sucesso", affectedRows: result.affectedRows };
};
