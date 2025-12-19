import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import "./Inicio.css";

function Inicio() {
  const [jefe, setJefe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("http://localhost:3000/api/auth/me")
      .then((data) => {
        if (data) {
          setJefe(data);
        }
      })
      .catch((error) => {
        console.error("Error al cargar datos del jefe:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="inicio-loading">Cargando datos...</p>;
  }

  if (!jefe) {
    return <p className="inicio-error">No se pudieron cargar los datos del usuario.</p>;
  }

  return (
    <div className="inicio-container">
      <h1 className="inicio-title">
        👋 Bienvenido, <span>{jefe.nombre}</span>
      </h1>

      <section className="inicio-card">
        <h2>Datos del jefe</h2>

        <ul className="inicio-list">
          <li>
            <strong>Email:</strong> {jefe.email}
          </li>
          <li>
            <strong>NIF:</strong> {jefe.nif}
          </li>
          <li>
            <strong>Teléfono:</strong> {jefe.telefono}
          </li>
          <li>
            <strong>Especialidad:</strong> {jefe.especialidad}
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Inicio;
