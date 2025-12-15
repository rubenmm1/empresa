import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Inicio from "./pages/Inicio.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inicio" element={<Inicio />} />
    </Routes>
  );
}

export default App;
