import * as empleadosModel from "../models/empleados.model.js";

// 🔹 Listar empleados
export async function listar(req, res) {
  try {
    const id_jefe = req.usuario.id;
    const empleados = await empleadosModel.obtenerPorJefe(id_jefe);
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados" });
  }
}

// 🔹 Crear empleado
export async function crear(req, res) {
  try {
    const id_jefe = req.usuario.id;
    const { nombre, nif, telefono, cargo } = req.body;

    const nuevo = await empleadosModel.crearEmpleado({
      nombre,
      nif,
      telefono,
      cargo,
      id_jefe,
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear empleado" });
  }
}

// 🔹 Editar empleado
export async function actualizar(req, res) {
  try {
    const id_jefe = req.usuario.id;
    const { id } = req.params;

    const actualizado = await empleadosModel.actualizarEmpleado(
      id,
      req.body,
      id_jefe
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar empleado" });
  }
}

// 🔹 Eliminar empleado
export async function eliminar(req, res) {
  try {
    const id_jefe = req.usuario.id;
    const { id } = req.params;

    const eliminado = await empleadosModel.eliminarEmpleado(id, id_jefe);

    if (!eliminado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar empleado" });
  }
}
