import * as proyectosModel from "../models/proyectos.model.js";

// 🔹 Listar empleados
export async function listar(req, res) {
  try {
    const id_jefe = req.usuario.id;
    const proyectos = await proyectosModel.obtenerPorJefe(id_jefe);
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
}

// 🔹 Crear empleado
export async function crear(req, res) {
  try {
    const id_jefe = req.usuario.id;
    const { nombre, fecha_inicio, tematica } = req.body;

    const nuevo = await proyectosModel.crearProyecto({
      nombre,
      fecha_inicio,
      tematica,
      id_jefe,
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear proyecto" });
  }
}

// 🔹 Editar proyecto
export async function actualizar(req, res) {
  try {
    const id_jefe = req.usuario.id;
    const { id } = req.params;

    const actualizado = await proyectosModel.actualizarProyecto(
      id,
      req.body,
      id_jefe
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.json({ message: "Proyecto actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar proyecto" });
  }
}

// 🔹 Eliminar empleado
export async function eliminar(req, res) {
  try {
    const id_jefe = req.usuario.id;
    const { id } = req.params;

    const eliminado = await proyectosModel.eliminarProyecto(id, id_jefe);

    if (!eliminado) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.json({ message: "Proyecto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar proyecto" });
  }
}
