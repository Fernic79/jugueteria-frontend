import { Link } from "react-router-dom";

const NavLinks = () => (
  <ul className="navbar-nav mx-auto">
    {" "}
    <li className="nav-item">
      <Link className="nav-link" to="/catalogo">
        Catálogo
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/alta">
        Cargar Producto
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/contacto">
        Contacto
      </Link>
    </li>
  </ul>
);

export default NavLinks;
