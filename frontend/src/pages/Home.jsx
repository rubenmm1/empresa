import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    nif: "",
    telefono: "",
    especialidad: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setFormData({
      nombre: "",
      email: "",
      nif: "",
      telefono: "",
      especialidad: "",
      password: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isRegister
        ? "http://localhost:3000/api/auth/register"
        : "http://localhost:3000/api/auth/login";

      const body = isRegister
        ? {
            nombre: formData.nombre,
            email: formData.email,
            nif: formData.nif,
            telefono: formData.telefono,
            especialidad: formData.especialidad,
            password: formData.password
          }
        : {
            email: formData.email,
            password: formData.password
          };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error en la operación");
        return;
      }

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Redirigir a Inicio
      navigate("/inicio");

    } catch (error) {
      console.error("❌ Error en la petición:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="form-title">
          {isRegister ? "Registro de usuario" : "Inicio de Sesión"}
        </h1>

        <form onSubmit={handleSubmit} className="form">

          {isRegister && (
            <>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nif">DNI</label>
                <input
                  type="text"
                  id="nif"
                  name="nif"
                  value={formData.nif}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="especialidad">Especialidad</label>
                <input
                  type="text"
                  id="especialidad"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        <p className="toggle-text">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button onClick={toggleMode} className="toggle-button">
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Home;
