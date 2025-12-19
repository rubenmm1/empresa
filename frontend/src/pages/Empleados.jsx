import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import "./Empleados.css";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoActivo, setEmpleadoActivo] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    nif: "",
    telefono: "",
    cargo: "",
  });

  // 🔹 Cargar empleados del jefe logueado
  useEffect(() => {
    authFetch("http://localhost:3000/api/empleados")
      .then(setEmpleados)
      .catch(console.error);
  }, []);

  // 🔹 Manejar cambios
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Crear / Editar empleado
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (empleadoActivo?.id_empleado) {
      // Editar
      await authFetch(
        `http://localhost:3000/api/empleados/${empleadoActivo.id_empleado}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
        }
      );

      setEmpleados(
        empleados.map((emp) =>
          emp.id_empleado === empleadoActivo.id_empleado
            ? { ...emp, ...formData }
            : emp
        )
      );
    } else {
      // Crear
      const nuevo = await authFetch("http://localhost:3000/api/empleados", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setEmpleados([...empleados, nuevo]);
    }

    setEmpleadoActivo(null);
    setFormData({ nombre: "", nif: "", telefono: "", cargo: "" });
  };

  // 🔹 Eliminar empleado
  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar empleado?")) return;

    await authFetch(`http://localhost:3000/api/empleados/${id}`, {
      method: "DELETE",
    });

    setEmpleados(empleados.filter((e) => e.id_empleado !== id));
  };

  // 🔹 Editar empleado
  const handleEditar = (empleado) => {
    setEmpleadoActivo(empleado);
    setFormData({
      nombre: empleado.nombre,
      nif: empleado.nif,
      telefono: empleado.telefono,
      cargo: empleado.cargo,
    });
  };

  return (
    <div className="empleados-container">
      <h1>Empleados</h1>

      <button
        className="btn-primary"
        onClick={() => setEmpleadoActivo({})}
      >
        ➕ Nuevo empleado
      </button>

      {empleadoActivo && (
        <form className="empleado-form" onSubmit={handleSubmit}>
          <h2>
            {empleadoActivo.id_empleado
              ? "Editar empleado"
              : "Crear empleado"}
          </h2>

          <input
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <input
            name="nif"
            placeholder="NIF"
            value={formData.nif}
            onChange={handleChange}
            required
          />

          <input
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />

          <input
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
          />

          <div className="form-actions">
            <button type="submit" className="btn-success">
              Guardar
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setEmpleadoActivo(null)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <table className="empleados-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>NIF</th>
            <th>Teléfono</th>
            <th>Cargo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id_empleado}>
              <td>{empleado.nombre}</td>
              <td>{empleado.nif}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.cargo}</td>
              <td>
                <button onClick={() => handleEditar(empleado)}>✏️</button>
                <button
                  onClick={() => handleEliminar(empleado.id_empleado)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Empleados;
