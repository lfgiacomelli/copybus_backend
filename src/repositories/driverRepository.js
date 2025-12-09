import { db } from "../db/db.js";

export const getAllDrivers = (emp_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM motoristas WHERE emp_codigo = ?",
            [emp_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

export const getDriverById = (mot_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM motoristas WHERE mot_codigo = ? LIMIT 1",
            [mot_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            }
        );
    });
};

export const addDriver = (driverData) => {
    return new Promise((resolve, reject) => {
        db.query(" INSERT INTO motoristas (mot_nome, mot_cpf, mot_cnh, mot_email, mot_status, mot_created_at, mot_updated_at, emp_codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [

            driverData.mot_nome,
            driverData.mot_cpf,
            driverData.mot_cnh,
            driverData.mot_email,
            driverData.mot_status,
            driverData.mot_created_at,
            driverData.mot_updated_at,
            driverData.emp_codigo
        ], (err, results) => {
            if (err) return reject(err);
            resolve({
                mot_codigo: results.insertId,
                ...driverData
            });
        });
    });
};

export const updateDriver = (mot_codigo, updateData) => {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];
        for (const key in updateData) {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        }
        fields.push("mot_updated_at = ?");
        values.push(new Date());
        values.push(mot_codigo);
        const query = `
        UPDATE motoristas
        SET ${fields.join(", ")}
        WHERE mot_codigo = ?
        `;
        db.query(query, values, (err, results) => {
            if (err) return reject(err);
            resolve({
                message: "Motorista atualizado com sucesso",
                affectedRows: results.affectedRows
            });
        });
    });
};

export const deleteDriver = (mot_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM motoristas WHERE mot_codigo = ?",
            [mot_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve({
                    message: "Motorista deletado com sucesso",
                    affectedRows: results.affectedRows
                });
            }
        );
    });
};