import React from "react";
import "../styles/Contacto.css";
import fotoEquipo from "../assets/grupoEmpleados.webp";

const Contacto = () => {
  return (
    <main className="main-contacto">
      <div className="container">
        {/* SECCIÓN SOBRE NOSOTROS */}
        <section className="row justify-content-center mb-5 text-center">
          <div className="col-lg-8">
            <h2 className="mb-4">Sobre nosotros</h2>
            <p className="lead">
              Desde el año 1995 nos dedicamos de compromiso al comercio de
              juguetes de calidad.
            </p>
            <p>
              Nuestra misión es entregar productos de originalidad, inspirados
              en el universo que compartimos con nuestros clientes. Trabajamos
              con pasión para ofrecer productos únicos sin importar el costo.
            </p>

            <figure className="mt-4">
              <img
                src={fotoEquipo}
                alt="Equipo"
                className="foto-equipo shadow"
              />
              <figcaption className="figcaption-space">
                Gracias por su preferencia
              </figcaption>
            </figure>
          </div>
        </section>

        <hr className="my-5" />

        {/* SECCIÓN FORMULARIO */}
        <section className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="custom-form">
              <h2 className="text-center mb-4">Formulario de Contacto</h2>

              <form>
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="pepe@gmail.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Comentarios:</label>
                  <textarea className="form-control" rows="3"></textarea>
                </div>

                <div className="mb-4">
                  <p className="fw-bold">Preferencias:</p>
                  <div className="d-flex flex-wrap gap-3">
                    {["Autos", "Aviones", "Muñecos", "Juegos de Mesa"].map(
                      (item) => (
                        <div key={item} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={item}
                          />
                          <label className="form-check-label" htmlFor={item}>
                            {item}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn-espacial">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contacto;
