import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import "./Proyectos.css";

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoActivo, setProyectoActivo] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    fecha_inicio: "",
    tematica: "",
  });

  // 🔹 Cargar proyectos del jefe logueado
  const cargarProyectos = async () => {
    try {
      const data = await authFetch("http://localhost:3000/api/proyectos");
      setProyectos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Crear / Editar proyecto
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (proyectoActivo?.id_proyecto) {
        // Editar
        const actualizado = await authFetch(
          `http://localhost:3000/api/proyectos/${proyectoActivo.id_proyecto}`,
          {
            method: "PUT",
            body: JSON.stringify(formData),
          }
        );

        // 🔹 Actualiza la lista usando la respuesta del servidor
        setProyectos(
          proyectos.map((p) =>
            p.id_proyecto === proyectoActivo.id_proyecto
              ? { ...p, ...formData } // si tu backend no devuelve el proyecto, usamos formData
              : p
          )
        );
      } else {
        // Crear
        const nuevo = await authFetch("http://localhost:3000/api/proyectos", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        setProyectos([...proyectos, nuevo]);
      }

      setProyectoActivo(null);
      setFormData({ nombre: "", fecha_inicio: "", tematica: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Eliminar proyecto
  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar proyecto?")) return;

    try {
      await authFetch(`http://localhost:3000/api/proyectos/${id}`, {
        method: "DELETE",
      });

      setProyectos(proyectos.filter((p) => p.id_proyecto !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Editar proyecto
  const handleEditar = (proyecto) => {
    setProyectoActivo(proyecto);
    setFormData({
      nombre: proyecto.nombre,
      fecha_inicio: proyecto.fecha_inicio.split("T")[0], // corta la parte de hora
      tematica: proyecto.tematica,
    });
  };

  return (
    <div className="proyectos-container">
      <h1>Proyectos</h1>

      <button className="btn-primary" onClick={() => setProyectoActivo({})}>
        ➕ Nuevo proyecto
      </button>

      {proyectoActivo && (
        <form className="proyecto-form" onSubmit={handleSubmit}>
          <h2>
            {proyectoActivo.id_proyecto
              ? "Editar proyecto"
              : "Crear proyecto"}
          </h2>

          <input
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="fecha_inicio"
            placeholder="Fecha de inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            required
          />

          <input
            name="tematica"
            placeholder="Temática"
            value={formData.tematica}
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
              onClick={() => setProyectoActivo(null)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="proyectos-grid">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id_proyecto} className="proyecto-card">
            <h3>{proyecto.nombre}</h3>
            <p>
              <strong>Inicio:</strong>{" "}
              {new Date(proyecto.fecha_inicio).toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong>Temática:</strong> {proyecto.tematica}
            </p>
            <div className="form-actions">
              <button onClick={() => handleEditar(proyecto)}>✏️ Editar</button>
              <button onClick={() => handleEliminar(proyecto.id_proyecto)}>
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proyectos;
