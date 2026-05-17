import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import NavLinks from "./EnlacesNavegacion";
import Estado from "./BarraLogin";
import Buscador from "./BarraBusqueda";
import { usarCarrito } from "../context/CarritoContext";
import Logo from "../assets/spaceshipLogo.png";

// Recibimos setBusqueda por props para el pasamanos de datos
const Navegacion = ({ setBusqueda }) => {
  const { totalItems } = usarCarrito();

  return (
    // Componente Navbar de react-bootstrap
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="navbar-dark"
    >
      <Container fluid>
        {/* Logo y Marca */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center"
        >
          <img
            src={Logo}
            alt="Logo Juguetería Cósmica"
            className="d-inline-block align-top me-2"
            style={{ width: "40px" }}
          />
          Juguetería Cósmica
        </Navbar.Brand>

        {/* Login siempre visible */}
        <Estado />

        {/* Carrito afuera del menu colapsado para que siempre sea accesible */}
        <div className="d-flex align-items-center ms-auto me-3 order-lg-last">
          <Link to="/carrito" className="nav-link text-white position-relative">
            <span style={{ fontSize: "1.5rem", marginLeft: "0.3rem" }}>🛒</span>
            {totalItems > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Botón hamburguesa */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Contenido que colapsa en el menu */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto text-center">
            <NavLinks />
          </Nav>
          <div className="mt-2 mt-lg-0 d-flex justify-content-center">
            {/* Función para el componente de búsqueda */}
            <Buscador setBusqueda={setBusqueda} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacion;
