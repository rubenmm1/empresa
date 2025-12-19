import pool from "../config/db.js";

// 🔹 Obtener empleados del jefe logueado
export async function obtenerPorJefe(id_jefe) {
  const [rows] = await pool.query(
    `SELECT id_empleado, nombre, nif, telefono, cargo
     FROM empleados
     WHERE id_jefe = ?`,
    [id_jefe]
  );
  return rows;
}

// 🔹 Crear empleado
export async function crearEmpleado({ nombre, nif, telefono, cargo, id_jefe }) {
  const [result] = await pool.query(
    `INSERT INTO empleados (nombre, nif, telefono, cargo, id_jefe)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, nif, telefono, cargo, id_jefe]
  );

  return {
    id_empleado: result.insertId,
    nombre,
    nif,
    telefono,
    cargo,
  };
}

// 🔹 Actualizar empleado
export async function actualizarEmpleado(id_empleado, data, id_jefe) {
  const { nombre, nif, telefono, cargo } = data;

  const [result] = await pool.query(
    `UPDATE empleados
     SET nombre = ?, nif = ?, telefono = ?, cargo = ?
     WHERE id_empleado = ? AND id_jefe = ?`,
    [nombre, nif, telefono, cargo, id_empleado, id_jefe]
  );

  return result.affectedRows;
}

// 🔹 Eliminar empleado
export async function eliminarEmpleado(id_empleado, id_jefe) {
  const [result] = await pool.query(
    `DELETE FROM empleados
     WHERE id_empleado = ? AND id_jefe = ?`,
    [id_empleado, id_jefe]
  );

  return result.affectedRows;
}
