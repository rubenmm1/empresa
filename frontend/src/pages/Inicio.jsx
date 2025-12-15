function Inicio() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div>
      <h1>Bienvenido {usuario?.nombre}</h1>
      <p>Esta es la página de inicio</p>
    </div>
  );
}

export default Inicio;
