import { NavLink } from "react-router-dom";
import "./Aside.css";

function Aside() {
  return (
    <aside className="aside">
      <nav className="aside-nav">
        <NavLink
          to="/inicio"
          className={({ isActive }) =>
            isActive ? "aside-link active" : "aside-link"
          }
        >
          🏠 Inicio
        </NavLink>

        <NavLink
          to="/empleados"
          className={({ isActive }) =>
            isActive ? "aside-link active" : "aside-link"
          }
        >
          👥 Empleados
        </NavLink>

        <NavLink
          to="/proyectos"
          className={({ isActive }) =>
            isActive ? "aside-link active" : "aside-link"
          }
        >
          📁 Proyectos
        </NavLink>



        <NavLink
          to="/asignacion"
          className={({ isActive }) =>
            isActive ? "aside-link active" : "aside-link"
          }
        >
          ⏩ Asignación
        </NavLink>
      </nav>
    </aside>
  );
}

export default Aside;
