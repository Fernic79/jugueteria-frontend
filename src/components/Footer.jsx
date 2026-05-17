import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/spaceshipLogo.png";
import "../styles/index.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row className="align-items-center">
          {/* Lado Izquierdo: Logo y Marca */}
          <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
              <img
                src={Logo}
                alt="Logo Juguetería Cósmica"
                style={{ width: "40px", height: "auto" }}
                className="me-2"
              />
              <h5 className="mb-0 fw-bold">Juguetería Cósmica</h5>
            </div>
            <p className="small text-secondary mb-0">
              ¡Llevando diversión a todos los rincones de la galaxia!
            </p>
          </Col>

          {/* Lado Derecho: Redes y Copyright */}
          <Col md={6} className="text-center text-md-end">
            <div className="mb-3">
              <h6 className="small text-uppercase tracking-wider text-secondary mb-3">
                ¡Seguinos en el espacio!
              </h6>

              <div className="d-flex justify-content-center justify-content-md-end gap-3 flex-wrap">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light fs-4 link-hover"
                >
                  <i className="bi bi-instagram"></i>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light fs-4 link-hover"
                >
                  <i className="bi bi-facebook"></i>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light fs-4 link-hover"
                >
                  <i className="bi bi-tiktok"></i>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/tunúmero"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light fs-4 link-hover"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light fs-4 link-hover"
                >
                  <i className="bi bi-youtube"></i>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/tu-usuario"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light fs-4 link-hover"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <p className="mb-0 small text-secondary">
              © {new Date().getFullYear()}{" "}
              <span className="text-light">Garcia Fernando Nicolás</span>
              <br className="d-md-none" /> — Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
