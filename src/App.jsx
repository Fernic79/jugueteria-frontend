import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GestorCarrito } from "./context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";

import Navegacion from "./components/Navegacion";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import AltaProductos from "./pages/AltaProductos";
import Autenticacion from "./pages/AutenticacionUsuarios";
import Carrito from "./pages/Carrito";
import DetalleProducto from "./pages/DetalleProductos";
import Contacto from "./pages/Contacto";

function App() {
  //Estado global de la búsqueda para filtrar productos en el catálogo
  const [busqueda, setBusqueda] = useState("");

  return (
    <GestorCarrito>
      <BrowserRouter>
        {/* Función para actualizar la Navbar */}
        <Navegacion setBusqueda={setBusqueda} />

        <div className="container mt-4">
          <Routes>
            {/* Paso del valor al catálogo */}
            <Route path="/" element={<Home busqueda={busqueda} />} />
            <Route
              path="/catalogo"
              element={<Catalogo busqueda={busqueda} />}
            />

            <Route path="/login" element={<Autenticacion />} />
            <Route path="/alta" element={<AltaProductos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </GestorCarrito>
  );
}

export default App;
