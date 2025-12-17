import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";

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
    return <p>Cargando datos...</p>;
  }

  if (!jefe) {
    return <p>No se pudieron cargar los datos del usuario.</p>;
  }

  return (
    <div>
      <h1>👋 Bienvenido, {jefe.nombre}</h1>

      <section style={{ marginTop: "2rem" }}>
        <h2>Datos del jefe</h2>

        <ul>
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
