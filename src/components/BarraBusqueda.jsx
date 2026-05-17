import { useNavigate } from "react-router-dom";

const Buscador = ({ setBusqueda }) => {
  const navigate = useNavigate();
  //Recibe la función por props

  const manejarEnvio = (e) => {
    e.preventDefault();
    navigate("/catalogo"); //Para que funcione en todo el sitio redirijo al catalogo
  };

  return (
    <form className="d-flex" style={{ width: "300px" }} onSubmit={manejarEnvio}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Buscar juguete..."
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className="btn btn-outline-info" type="submit">
        🔍
      </button>
    </form>
  );
};

export default Buscador;
