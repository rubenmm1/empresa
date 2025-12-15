import pool from "../config/db.js";


export async function buscarPorEmail(email){
    const [rows] = await pool.query(
        'SELECT id, nombre, email, nif, telefono, especialidad, password FROM jefes WHERE email = ?', [email]
    );

    return rows[0];
}


export async function crearJefe({ nombre, email, nif, telefono, especialidad, password }) {
  const [result] = await pool.query(
    'INSERT INTO jefes (nombre, email, nif, telefono, especialidad, password) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, email, nif, telefono, especialidad, password]
  );

  return {
    insertId: result.insertId,
    id: result.insertId,
    nombre,
    email, 
    nif, 
    telefono,
    especialidad
  };
}