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
    if (path.includes("empleados/crear")) return "Creación de empleado";
    if (path.includes("empleados/modificar")) return "Modificación de empleado";
    if (path.includes("empleados/ver")) return "Listado de empleados";
    if (path.includes("empleados/eliminar")) return "Eliminar empleado";

    if (path.includes("proyectos/crear")) return "Creación de proyecto";
    if (path.includes("proyectos/modificar")) return "Modificación de proyecto";
    if (path.includes("proyectos/ver")) return "Listado de proyectos";
    if (path.includes("proyectos/eliminar")) return "Eliminar proyecto";

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
