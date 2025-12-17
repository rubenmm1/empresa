import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Aside.css";

function Aside() {
  const [openProyectos, setOpenProyectos] = useState(false);
  const [openEmpleados, setOpenEmpleados] = useState(false);

  return (
    <aside className="aside">
      <h2 className="aside-title">Empresa</h2>

      <nav className="aside-nav">
        {/* INICIO */}
        <NavLink to="/inicio" className="nav-item">
          Inicio
        </NavLink>

        {/* PROYECTOS */}
        <button
          className="nav-item nav-button"
          onClick={() => setOpenProyectos(!openProyectos)}
        >
          Proyectos
        </button>

        {openProyectos && (
          <div className="submenu">
            <NavLink to="/proyectos/crear" className="submenu-item">
              Crear
            </NavLink>
            <NavLink to="/proyectos/modificar" className="submenu-item">
              Modificar
            </NavLink>
            <NavLink to="/proyectos/ver" className="submenu-item">
              Ver
            </NavLink>
            <NavLink to="/proyectos/eliminar" className="submenu-item">
              Eliminar
            </NavLink>
          </div>
        )}

        {/* EMPLEADOS */}
        <button
          className="nav-item nav-button"
          onClick={() => setOpenEmpleados(!openEmpleados)}
        >
          Empleados
        </button>

        {openEmpleados && (
          <div className="submenu">
            <NavLink to="/empleados/crear" className="submenu-item">
              Crear
            </NavLink>
            <NavLink to="/empleados/modificar" className="submenu-item">
              Modificar
            </NavLink>
            <NavLink to="/empleados/ver" className="submenu-item">
              Ver
            </NavLink>
            <NavLink to="/empleados/eliminar" className="submenu-item">
              Eliminar
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}

export default Aside;
