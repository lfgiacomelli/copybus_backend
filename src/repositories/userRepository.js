import { db } from "../db/db.js";

export const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM usuarios WHERE usu_email = ? LIMIT 1",
            [email],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            }
        );
    });
};

export const findUserById = (usu_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT u.*, e.emp_nome, e.emp_logo FROM usuarios u LEFT JOIN empresas e ON e.emp_codigo = u.emp_codigo WHERE u.usu_codigo = ? LIMIT 1",
            [usu_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            }
        );
    });
};

export const addUser = (userData) => {
    return new Promise((resolve, reject) => {
        const {
            usu_nome,
            usu_email,
            usu_senha,
            usu_created_at,
            usu_updated_at,
            emp_codigo
        } = userData;

        db.query(
            `INSERT INTO usuarios 
        (usu_nome, usu_email, usu_senha, usu_created_at, usu_updated_at, emp_codigo)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [
                usu_nome,
                usu_email,
                usu_senha,
                usu_created_at,
                usu_updated_at,
                emp_codigo
            ],
            (err, results) => {
                if (err) return reject(err);

                resolve({
                    id: results.insertId,
                    ...userData
                });
            }
        );
    });
};

export const updateUser = (usu_codigo, updateData) => {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];

        for (const key in updateData) {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        }

        fields.push("usu_updated_at = ?");
        values.push(new Date());

        values.push(usu_codigo);

        const query = `
      UPDATE usuarios 
      SET ${fields.join(", ")} 
      WHERE usu_codigo = ?
    `;

        db.query(query, values, (err, results) => {
            if (err) return reject(err);

            resolve({
                message: "Usuário atualizado com sucesso",
                affectedRows: results.affectedRows
            });
        });
    });
};

export const deleteUser = (usu_codigo) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM usuarios WHERE usu_codigo = ?", [usu_codigo], (err, results) => {
            if (err) return reject(err);

            resolve({
                message: "Usuário deletado com sucesso",
                affectedRows: results.affectedRows
            });
        });
    });
}