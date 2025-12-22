import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import "./Asignacion.css";

function Asignacion() {
  const [proyectos, setProyectos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");

  /* ===============================
     CARGA INICIAL
  =============================== */
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const proyectosData = await authFetch(
        "http://localhost:3000/api/proyectos"
      );
      const empleadosData = await authFetch(
        "http://localhost:3000/api/empleados"
      );
      const asignacionesData = await authFetch(
        "http://localhost:3000/api/asignaciones"
      );

      setProyectos(Array.isArray(proyectosData) ? proyectosData : []);
      setEmpleados(Array.isArray(empleadosData) ? empleadosData : []);
      setAsignaciones(Array.isArray(asignacionesData) ? asignacionesData : []);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  /* ===============================
     CREAR ASIGNACIÓN
  =============================== */
  const asignarEmpleado = async (e) => {
    e.preventDefault();

    if (!proyectoSeleccionado || !empleadoSeleccionado) return;

    try {
      await authFetch("http://localhost:3000/api/asignaciones", {
        method: "POST",
        body: JSON.stringify({
          id_proyecto: proyectoSeleccionado,
          id_empleado: empleadoSeleccionado,
        }),
      });

      setProyectoSeleccionado("");
      setEmpleadoSeleccionado("");
      cargarDatos();
    } catch (error) {
      console.error("Error al asignar empleado:", error);
    }
  };

  /* ===============================
     ELIMINAR ASIGNACIÓN
  =============================== */
  const eliminarAsignacion = async (id_proyecto, id_empleado) => {
    try {
      await authFetch(
        `http://localhost:3000/api/asignaciones/${id_proyecto}/${id_empleado}`,
        {
          method: "DELETE",
        }
      );

      cargarDatos();
    } catch (error) {
      console.error("Error al eliminar asignación:", error);
    }
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="asignacion-container">
      <h1>Asignación de empleados a proyectos</h1>

      {/* FORMULARIO */}
      <form onSubmit={asignarEmpleado} className="asignacion-form">
        <select
          value={proyectoSeleccionado}
          onChange={(e) => setProyectoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona proyecto</option>
          {proyectos.map((p) => (
            <option key={p.id_proyecto} value={p.id_proyecto}>
              {p.nombre}
            </option>
          ))}
        </select>

        <select
          value={empleadoSeleccionado}
          onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona empleado</option>
          {empleados.map((e) => (
            <option key={e.id_empleado} value={e.id_empleado}>
              {e.nombre}
            </option>
          ))}
        </select>

        <button type="submit">Asignar</button>
      </form>

      {/* PROYECTOS + EMPLEADOS */}
      {proyectos.map((proyecto) => {
        const empleadosAsignados = asignaciones.filter(
          (a) => a.id_proyecto === proyecto.id_proyecto
        );

        return (
          <div key={proyecto.id_proyecto} className="proyecto-card">
            <h2>{proyecto.nombre}</h2>

            {empleadosAsignados.length === 0 ? (
              <p className="texto-vacio">No hay empleados asignados</p>
            ) : (
              <ul className="empleados-lista">
                {empleadosAsignados.map((a) => (
                  <li key={`${a.id_proyecto}-${a.id_empleado}`}>
                    <span>{a.nombre_empleado}</span>
                    <button
                      className="btn-eliminar"
                      onClick={() =>
                        eliminarAsignacion(a.id_proyecto, a.id_empleado)
                      }
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Asignacion;
