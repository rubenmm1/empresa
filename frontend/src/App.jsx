import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Inicio from "./pages/Inicio.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/inicio" element={<Inicio />} />
      </Route>
    </Routes>
  );
}

export default App;
