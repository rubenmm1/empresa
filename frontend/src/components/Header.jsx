import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Convertir ruta en texto legible
  const getTitleFromPath = () => {
    const path = location.pathname;

    if (path.includes("inicio")) return "Inicio";
    if (path.includes("empleados")) return "Panel de empleados";
    if (path.includes("proyectos")) return "Panel de proyectos";
    if (path.includes("asignacion")) return "Panel de asignaciones";
    return "Panel";
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="page-title">{getTitleFromPath()}</h1>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
}

export default Header;
