import { db } from "../db/db.js";

export const findManagerByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM gestores WHERE ges_email = ? LIMIT 1",
            [email],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            }
        );
    });
};

export const getAllManagers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM gestores", (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const getManagerById = (ges_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM gestores WHERE ges_codigo = ? LIMIT 1",
            [ges_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            }
        );
    });
};

export const addManager = (managerData) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO gestores (ges_nome, ges_email, ges_senha, ges_status, ges_created_at, ges_updated_at) VALUES (?, ?, ?, ?, ?, ?)",
            [
                managerData.ges_nome,
                managerData.ges_email,
                managerData.ges_senha,
                managerData.ges_status,
                managerData.ges_created_at,
                managerData.ges_updated_at
            ],
            (err, results) => {
                if (err) return reject(err);
                resolve({
                    ges_codigo: results.insertId,
                    ...managerData
                });
            }
        );
    });
};

export const updateManager = (ges_codigo, updateData) => {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];

        for (const key in updateData) {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        }

        fields.push("ges_updated_at = ?");
        values.push(new Date());

        values.push(ges_codigo);

        const query = `
      UPDATE gestores 
      SET ${fields.join(", ")} 
      WHERE ges_codigo = ?
    `;

        db.query(query, values, (err, results) => {
            if (err) return reject(err);

            resolve({
                message: "Gestor atualizado com sucesso",
                affectedRows: results.affectedRows
            });
        });
    });
};

export const deleteManager = (ges_codigo) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM gestores  WHERE ges_codigo = ?", [ges_codigo], (err, results) => {
            if (err) return reject(err);
            resolve({
                message: "Gestor deletado com sucesso",
                affectedRows: results.affectedRows
            });
        })
    })
}

// funções do gestor relacionado às empresas

export const getAllCompanies = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM empresas", (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

export const getCompanyById = (emp_codigo) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM empresas WHERE emp_codigo = ? LIMIT 1", [emp_codigo], (err, results) => {
            if (err) return reject(err);
            resolve(results[0] || null);
        }
        );
    })
}

export const addCompany = (companyData) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO empresas (emp_nome, emp_cnpj, emp_telefone, emp_endereco, emp_email, emp_logo, emp_created_at, emp_updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
            companyData.emp_nome,
            companyData.emp_cnpj,
            companyData.emp_telefone,
            companyData.emp_endereco,
            companyData.emp_email,
            companyData.emp_logo,
            companyData.emp_created_at,
            companyData.emp_updated_at
        ], (err, results) => {
            if (err) return reject(err);
            resolve({
                emp_codigo: results.insertId,
                ...companyData
            });
        });
    });
};

export const updateCompany = (emp_codigo, updateData) => {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];

        for (const key in updateData) {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        }

        fields.push("emp_updated_at = ?");
        values.push(new Date());

        values.push(emp_codigo);

        const query = `
      UPDATE empresas 
      SET ${fields.join(", ")} 
      WHERE emp_codigo = ?
    `;

        db.query(query, values, (err, results) => {
            if (err) return reject(err);

            resolve({
                message: "Empresa atualizada com sucesso",
                affectedRows: results.affectedRows
            });
        });
    });
};

export const verifyEmployeeExists = (emp_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT COUNT(*) AS total FROM usuarios WHERE emp_codigo = ?",
            [emp_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0].total > 0);
            }
        );
    });
};

export const deleteCompany = (emp_codigo) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM empresas WHERE emp_codigo = ?", [emp_codigo], (err, results) => {
            if (err) return reject(err);
            resolve({
                message: "Empresa deletada com sucesso",
                affectedRows: results.affectedRows
            });
        });
    })
};