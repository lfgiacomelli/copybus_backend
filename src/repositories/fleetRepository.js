import { db } from "../db/db.js";

export const getAllFleets = (emp_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM frotas WHERE emp_codigo = ?",
            [emp_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    })
};

export const getFleetById = (fro_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM frotas WHERE fro_codigo = ? LIMIT 1",
            [fro_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            }
        );
    });
};

export const addFleet = (fleetData) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO frotas (fro_nome, fro_descricao, fro_created_at, fro_updated_at, emp_codigo) VALUES (?, ?, ?, ?, ?)", [
            fleetData.fro_nome,
            fleetData.fro_descricao,
            fleetData.fro_created_at,
            fleetData.fro_updated_at,
            fleetData.emp_codigo
        ], (err, results) => {
            if (err) return reject(err);
            resolve({
                fro_codigo: results.insertId,
                ...fleetData
            });
        });
    });
};

export const updateFleet = (fro_codigo, updateData) => {
    return new Promise((resolve, reject) => {
        const fields = [];
        const values = [];

        for (const key in updateData) {
            fields.push(`${key} = ?`);
            values.push(updateData[key]);
        }

        fields.push("fro_updated_at = ?");
        values.push(new Date());

        values.push(fro_codigo);

        const query = `
      UPDATE frotas 
      SET ${fields.join(", ")} 
      WHERE fro_codigo = ?
    `;

        db.query(query, values, (err, results) => {
            if (err) return reject(err);

            resolve({
                message: "Frota atualizada com sucesso",
                affectedRows: results.affectedRows
            });
        });
    });
};
export const deleteFleet = (fro_codigo) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction(async (err) => {
            if (err) return reject(err);

            try {
                await new Promise((resolve, reject) => {
                    db.query(
                        "UPDATE veiculos SET fro_codigo = NULL WHERE fro_codigo = ?",
                        [fro_codigo],
                        (err) => (err ? reject(err) : resolve())
                    );
                });

                db.query(
                    "DELETE FROM frotas WHERE fro_codigo = ?",
                    [fro_codigo],
                    (err, results) => {
                        if (err) {
                            db.rollback(() => reject(err));
                        }

                        db.commit(() => {
                            resolve({
                                message: "Frota deletada com sucesso",
                                affectedRows: results.affectedRows
                            });
                        });
                    }
                );
            } catch (err) {
                db.rollback(() => reject(err));
            }
        });
    });
};

export const countVeiclesInFleet = (fro_codigo) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT COUNT(*) AS total FROM veiculos WHERE fro_codigo = ?",
            [fro_codigo],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0].total);
            }
        );
    });
};
