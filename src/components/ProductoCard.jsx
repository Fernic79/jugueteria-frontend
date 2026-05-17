import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usarCarrito } from "../context/CarritoContext";
import heartBlack from "../assets/heartBlack.png";
import heartRed from "../assets/heartRed.png";
import shareImg from "../assets/share.png";
import "../styles/ProductoCard.css";

const ProductoCard = ({ juguete }) => {
  const [esFavorito, setEsFavorito] = useState(false);
  const { agregarAlCarrito } = usarCarrito();

  // Función para cambiar el estado del corazón
  const toggleFavorito = (e) => {
    e.preventDefault();
    setEsFavorito(!esFavorito);
  };

  const manejarCompartir = (e) => {
    e.preventDefault();
    alert(
      `🚀 ¡Estás compartiendo el producto: ${juguete.nombre}!\n¡Gracias por difundir la magia galáctica!`,
    );
  };

  return (
    <Card className="card-cosmica h-100 shadow-sm">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={`/img/${juguete.imagen}`}
          alt={juguete.imagen_alt}
          title={juguete.imagen_title}
          className="img-juguete"
        />

        {/* CONTENEDOR DE INTERACCIONES (Derecha arriba) */}
        <div className="acciones-flotantes">
          {/* Botón de Like */}
          <div className="icono-accion" onClick={toggleFavorito}>
            <img
              src={esFavorito ? heartRed : heartBlack}
              alt="Favorito"
              className={`corazon-img ${esFavorito ? "activo" : ""}`}
            />
          </div>

          {/* Botón de Compartir */}
          <div className="icono-accion" onClick={manejarCompartir}>
            <img src={shareImg} alt="Compartir" className="share-img" />
          </div>
        </div>
      </div>

      <Card.Body className="d-flex flex-column text-center">
        <Card.Title className="fs-5 fw-bold">{juguete.nombre}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {juguete.descripcion_corta}
        </Card.Text>

        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fs-4 fw-bold text-danger">
              ${juguete.precio.toLocaleString()}
            </span>
            <Badge bg={juguete.stock > 0 ? "success" : "danger"}>
              {juguete.stock > 0 ? `Stock: ${juguete.stock}` : "Agotado"}
            </Badge>
          </div>

          <div className="d-grid gap-2">
            <button
              className="btn-espacial py-2"
              onClick={() => {
                agregarAlCarrito(juguete, 1);
                alert("¡Cargado al carrito, cadete!");
              }}
              disabled={juguete.stock === 0}
            >
              Comprar
            </button>

            <div className="d-flex justify-content-between align-items-center mt-2">
              <Link
                to={`/producto/${juguete._id}`}
                className="btn btn-link text-dark text-decoration-none small"
              >
                Ver detalle...
              </Link>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductoCard;
