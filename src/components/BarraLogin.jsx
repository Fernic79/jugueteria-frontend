import React from "react";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap"; // Importamos el componente oficial

const Estado = () => {
  const navigate = useNavigate();

  // Obtenemos el usuario del localStorage
  const usuarioRaw = localStorage.getItem("usuario");
  const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;

  const handleLogout = () => {
    // Limpiamos todo el rastro de la sesión
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    // Redirigimos al login
    navigate("/login");

    // Opcional: Forzar un refresh para limpiar estados globales si no usas Context
    window.location.reload();
  };

  return (
    <div className="d-flex align-items-center ms-3">
      {usuario ? (
        <NavDropdown
          title={`Hola, ${usuario.nombre}`}
          id="nav-dropdown-usuario"
          className="text-white"
        >
          <NavDropdown.Item onClick={handleLogout}>
            Cerrar Sesión
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <button
          className="btn btn-link nav-link text-info"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>
      )}
    </div>
  );
};

export default Estado;
