import pool from "../config/db.js";

// 🔹 Obtener proyectos del jefe logueado
export async function obtenerPorJefe(id_jefe) {
  const [rows] = await pool.query(
    `SELECT id_proyecto, nombre, fecha_inicio, tematica
     FROM proyectos
     WHERE id_jefe = ?`,
    [id_jefe]
  );
  return rows;
}

// 🔹 Crear empleado
export async function crearProyecto({ nombre, fecha_inicio, tematica, id_jefe }) {
  const [result] = await pool.query(
    `INSERT INTO proyectos (nombre, fecha_inicio, tematica, id_jefe)
     VALUES (?, ?, ?, ?)`,
    [nombre, fecha_inicio, tematica, id_jefe]
  );

  return {
    id_proyecto: result.insertId,
    nombre,
    fecha_inicio,
    tematica,
  };
}

// 🔹 Actualizar proyecto
export async function actualizarProyecto(id_proyecto, data, id_jefe) {
  const { nombre, fecha_inicio, tematica } = data;

  const [result] = await pool.query(
    `UPDATE proyectos
     SET nombre = ?, fecha_inicio = ?, tematica = ?
     WHERE id_proyecto = ? AND id_jefe = ?`,
    [nombre, fecha_inicio, tematica, id_proyecto, id_jefe]
  );

  return result.affectedRows;
}

// 🔹 Eliminar proyecto
export async function eliminarProyecto(id_proyecto, id_jefe) {
  const [result] = await pool.query(
    `DELETE FROM proyectos
     WHERE id_proyecto = ? AND id_jefe = ?`,
    [id_proyecto, id_jefe]
  );

  return result.affectedRows;
}
