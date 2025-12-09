import { db } from "../db/db.js";

export const getCompanyById = (emp_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM empresas WHERE emp_codigo = ? LIMIT 1",
            [emp_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            }
        );
    })
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
}