import * as asignacionesModel from "../models/asignaciones.model.js";

/* ===============================
   LISTAR ASIGNACIONES
=============================== */
export async function listarAsignaciones(req, res) {
  try {
    const id_jefe = req.usuario.id;

    const asignaciones =
      await asignacionesModel.obtenerAsignacionesPorJefe(id_jefe);

    res.json(asignaciones);
  } catch (error) {
    console.error("❌ Error al listar asignaciones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

/* ===============================
   CREAR ASIGNACIÓN
=============================== */
export async function crearAsignacion(req, res) {
  try {
    const { id_empleado, id_proyecto } = req.body;

    if (!id_empleado || !id_proyecto) {
      return res.status(400).json({
        message: "id_empleado e id_proyecto son obligatorios",
      });
    }

    await asignacionesModel.crearAsignacion(id_empleado, id_proyecto);

    res.status(201).json({ message: "Asignación creada correctamente" });
  } catch (error) {
    console.error("❌ Error al crear asignación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

/* ===============================
   ELIMINAR ASIGNACIÓN
=============================== */
export async function eliminarAsignacion(req, res) {
  try {
    const { id_empleado, id_proyecto } = req.params;

    await asignacionesModel.eliminarAsignacion(id_empleado, id_proyecto);

    res.json({ message: "Asignación eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar asignación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
