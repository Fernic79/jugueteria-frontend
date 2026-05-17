import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductoCard from "../components/ProductoCard";
import TituloGrafico from "../assets/titulo_cosmico.png";
import descuentos from "../assets/descuentos.png";

const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const traerDestacados = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/productos`,
        );
        setDestacados(data.slice(0, 4)); //Elegimos 4 productos para la fila de destacados
      } catch (err) {
        console.error("Error al cargar destacados");
      }
    };
    traerDestacados();
  }, []);

  return (
    <Container className="my-5 text-center">
      <section className="mb-5 px-2">
        <div className="mb-4">
          <img
            src={TituloGrafico}
            alt="Juguetería Cósmica"
            className="img-fluid"
            style={{
              width: "75%",
              maxWidth: "850px",
              borderRadius: "55px",
              opacity: "0.85",
            }}
          />
        </div>
        <p
          className="mt-3 fs-4 fw-light text-bk"
          style={{
            textShadow: "2px 2px 4px rgba(220, 72, 72, 0.8)",
            fontStyle: "italic",
          }}
        >
          ¡Diversión de otra galaxia para los más pequeños!
        </p>
        <div className="my-5 d-flex justify-content-center">
          <Link to="/catalogo">
            <img
              src={descuentos}
              alt="Banner de descuentos"
              className="img-fluid shadow-lg"
              style={{ width: "80%", maxWidth: "750px", borderRadius: "25px" }}
            />
          </Link>
        </div>

        <div className="mt-4 d-flex justify-content-center">
          {" "}
          <Button
            as={Link}
            to="/catalogo"
            className="btn-espacial btn-home px-5 py-8 fs-5"
          >
            DESPEGAR AL CATÁLOGO 🚀
          </Button>
        </div>
      </section>

      {/* SECCIÓN DESTACADOS */}
      <section className="mt-5 pt-5 border-top border-secondary border-opacity-25">
        <h3
          className="text-center mb-5 text-bk"
          style={{
            textShadow: "2px 2px 4px rgba(220, 72, 72, 0.8)",
            letterSpacing: "2px",
          }}
        >
          ⭐ Naves y Juguetes Destacados ⭐
        </h3>
        <Row>
          {destacados.map((juguete) => (
            <Col key={juguete._id} xs={12} sm={6} md={3} className="mb-4">
              <ProductoCard juguete={juguete} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Home;
