import pool from "../config/db.js";

/* ===============================
   OBTENER ASIGNACIONES DEL JEFE
=============================== */
export async function obtenerAsignacionesPorJefe(id_jefe) {
  const [rows] = await pool.query(
    `
    SELECT 
      ep.id_proyecto,
      ep.id_empleado,
      e.nombre AS nombre_empleado,
      p.nombre AS nombre_proyecto
    FROM empleado_proyecto ep
    JOIN empleados e ON ep.id_empleado = e.id_empleado
    JOIN proyectos p ON ep.id_proyecto = p.id_proyecto
    WHERE e.id_jefe = ?
    `,
    [id_jefe]
  );

  return rows;
}

/* ===============================
   CREAR ASIGNACIÓN
=============================== */
export async function crearAsignacion(id_empleado, id_proyecto) {
  const [result] = await pool.query(
    `
    INSERT INTO empleado_proyecto (id_empleado, id_proyecto)
    VALUES (?, ?)
    `,
    [id_empleado, id_proyecto]
  );

  return result;
}

/* ===============================
   ELIMINAR ASIGNACIÓN
=============================== */
export async function eliminarAsignacion(id_empleado, id_proyecto) {
  const [result] = await pool.query(
    `
    DELETE FROM empleado_proyecto
    WHERE id_empleado = ? AND id_proyecto = ?
    `,
    [id_empleado, id_proyecto]
  );

  return result;
}
