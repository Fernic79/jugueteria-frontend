import React, { useEffect } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { usarCarrito } from "../context/CarritoContext";

const Carrito = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    itemsCarrito,
    precioTotal,
    cantidadItems,
    agregarAlCarrito,
    eliminarDelCarrito,
    obtenerCarrito,
    vaciarCarrito,
  } = usarCarrito();

  //Cargar el carrito al entrar
  useEffect(() => {
    obtenerCarrito();
  }, []);

  //Para manejar el regreso de Mercado Pago
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (status === "success") {
      alert(
        "🚀 ¡Misión cumplida! El pago fue aprobado por la central galáctica.",
      );
      vaciarCarrito(); //Limpia el carrito local y en DB
      navigate("/carrito"); //Limpia la URL de los parámetros
    } else if (status === "failure") {
      alert("🚨 Error en la transmisión de fondos. Intenta nuevamente.");
      navigate("/carrito");
    }
  }, [location, navigate, vaciarCarrito]);

  const manejarPago = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert(
        "🚨 ¡Misión interrumpida! Debes iniciar sesión para procesar el pago.",
      );
      navigate("/login");
      return;
    }

    try {
      console.log("🛸 Conectando con la pasarela de pago...");

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/mercadopago/crear-preferencia`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      //Redirección al Checkout de Mercado Pago
      window.location.href = data.init_point;
    } catch (error) {
      console.error("Error en el checkout:", error);
      alert("Error al contactar con la central de pagos.");
    }
  };

  if (cantidadItems === 0) {
    return (
      <Container className="text-center my-5" style={{ minHeight: "60vh" }}>
        <h2>Tu carrito está vacío 🚀</h2>
        <Link to="/catalogo" className="btn btn-primary mt-3">
          Ir a la tienda
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ minHeight: "60vh" }}>
      <h2 className="mb-4">Tu Carrito Cósmico</h2>
      <Row>
        <Col md={8}>
          <Table responsive hover className="align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemsCarrito.map((item) => (
                <tr key={item.producto._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={`/img/${item.producto.imagen}`}
                        alt={item.producto.imagen_alt}
                        style={{ width: "50px", marginRight: "10px" }}
                      />
                      <span>{item.producto.nombre}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => agregarAlCarrito(item.producto, -1)}
                      >
                        {" "}
                        -{" "}
                      </Button>
                      <span className="mx-2">{item.cantidad}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => agregarAlCarrito(item.producto, 1)}
                      >
                        {" "}
                        +{" "}
                      </Button>
                    </div>
                  </td>
                  <td>${item.precio.toLocaleString()}</td>
                  <td>${(item.precio * item.cantidad).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarDelCarrito(item.producto._id)}
                    >
                      {" "}
                      🗑️{" "}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <div className="contenedor-cosmico p-3 border rounded shadow-sm">
            <h5>Resumen de Carga</h5>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Items:</span> <span>{cantidadItems}</span>
            </div>
            <div className="fs-4 fw-bold text-danger">
              <span>Total:</span> <span>${precioTotal.toLocaleString()}</span>
            </div>

            <Button
              className="btn-espacial w-100 mt-4 border-0 text-dark"
              style={{ backgroundColor: "#009ee3" }}
              onClick={manejarPago}
            >
              Pagar con Mercado Pago
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
