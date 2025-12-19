import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Inicio from "./pages/Inicio.jsx";
import Layout from "./components/Layout.jsx";
import Empleados from "./pages/Empleados.jsx";
import Proyectos from "./pages/Proyectos.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/proyectos" element={<Proyectos />} />
      </Route>
    </Routes>
  );
}

export default App;
