import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import ProductoCard from "../components/ProductoCard";

const Catalogo = ({ busqueda }) => {
  //Recibe dato por props
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const traerJuguetes = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/productos`,
        );
        setProductos(data);
      } catch (err) {
        setError("Error al conectar con la Galaxia de Juguetes.");
      } finally {
        setCargando(false);
      }
    };
    traerJuguetes();
  }, []);

  //Se crea una lista nueva por la búsqueda
  const productosFiltrados = productos.filter((juguete) =>
    juguete.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <Container className="my-5" style={{ minHeight: "80vh" }}>
      <h1 className="text-center mb-5">🚀 Catálogo Espacial 🪐</h1>

      {cargando && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {/* Mapeamos los productosFiltrados en lugar de productos */}
        {productosFiltrados.length > 0
          ? productosFiltrados.map((juguete) => (
              <Col
                key={juguete._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <ProductoCard juguete={juguete} />
              </Col>
            ))
          : !cargando && (
              <h4 className="text-center">
                No se encontraron juguetes en esta órbita 🛸
              </h4>
            )}
      </Row>
    </Container>
  );
};

export default Catalogo;
