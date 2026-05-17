import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { usarCarrito } from "../context/CarritoContext";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { agregarAlCarrito } = usarCarrito();

  useEffect(() => {
    const traerDetalle = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/productos/${id}`,
        );
        setProducto(data);
      } catch (err) {
        console.error(err);
      }
    };
    traerDetalle();
  }, [id]);

  if (!producto)
    return <div className="text-center mt-5">Cargando juguete...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`/img/${producto.imagen}`}
            alt={producto.imagen_alt}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <span className="badge bg-info text-dark mb-2">
            {producto.categoria.toUpperCase()}
          </span>
          <h1>{producto.nombre}</h1>
          <p className="text-muted">Marca: {producto.marca}</p>
          <h2 className="text-primary">${producto.precio.toLocaleString()}</h2>
          <p className="mt-4">{producto.descripcion_larga}</p>
          <p>
            <strong>Edad:</strong> {producto.edad_desde} a {producto.edad_hasta}{" "}
            años
          </p>
          <button
            className="btn btn-primary btn-lg w-100 mt-4"
            onClick={() => {
              agregarAlCarrito(producto, 1);
              alert("¡Producto sumado a la carga, cadete!");
            }}
            disabled={producto.stock === 0}
          >
            {producto.stock > 0 ? "Agregar al Carrito 🛒" : "Agotado"}
          </button>
          <Link to="/catalogo" className="btn btn-link w-100 mt-2">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
