import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

//Categorías de la Juguetería
const CATEGORIAS = [
  "autos",
  "muñecos",
  "juegos de mesa",
  "accesorios consolas",
  "juegos electronicos",
];

const AltaProductos = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
    marca: "",
    categoria: "",
    descripcion_corta: "",
    descripcion_larga: "",
    edad_desde: 1,
    edad_hasta: 99,
    imagen: "",
    imagen_alt: "",
    imagen_title: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    //Validación para campos numéricos
    let valorFinal = value;
    if (type === "number") {
      valorFinal = value === "" ? 0 : parseFloat(value);
    }

    setProducto({
      ...producto,
      [name]: valorFinal,
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    //Validación de edades
    if (producto.edad_desde > producto.edad_hasta) {
      alert("¡Error espacial! La edad mínima no puede ser mayor a la máxima.");
      return;
    }

    try {
      const respuesta = await axios.post(
        `${import.meta.env.VITE_API_URL}/productos`,
        producto,
      );

      if (respuesta.status === 201 || respuesta.status === 200) {
        alert("¡Juguete lanzado al espacio con éxito!");
        navigate("/catalogo");
      }
    } catch (error) {
      console.error("Error en el alta:", error);
      alert("Hubo un cortocircuito al guardar el producto.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 contenedor-cosmico">
          <h2 className="text-center mb-4">🚀 Lanzamiento de Nuevo Juguete</h2>
          <form onSubmit={manejarEnvio}>
            <div className="mb-3">
              <label className="fw-bold">Nombre del Producto:</label>
              <input
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                placeholder="Ej: Halcón Milenario"
                required
              />
            </div>

            <div className="grupo-input">
              <label>Marca:</label>
              <input
                type="text"
                name="marca"
                value={producto.marca}
                onChange={handleChange}
                placeholder="Ej: Galácticas"
                required
              />
            </div>

            <div className="grupo-input">
              <label>Categoría:</label>
              <select
                name="categoria"
                value={producto.categoria}
                onChange={handleChange}
                required
              >
                <option value="">- Seleccionar Categoría -</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="fila-inputs">
              <div className="grupo-input">
                <label>Precio ($):</label>
                <input
                  type="number"
                  name="precio"
                  value={producto.precio}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="grupo-input">
                <label>Stock disponible:</label>
                <input
                  type="number"
                  name="stock"
                  value={producto.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="fila-inputs">
              <div className="grupo-input">
                <label>Edad Desde:</label>
                <input
                  type="number"
                  name="edad_desde"
                  value={producto.edad_desde}
                  onChange={handleChange}
                  min="0"
                  max="18"
                />
              </div>
              <div className="grupo-input">
                <label>Edad Hasta:</label>
                <input
                  type="number"
                  name="edad_hasta"
                  value={producto.edad_hasta}
                  onChange={handleChange}
                  min="2"
                  max="99"
                />
              </div>
            </div>

            <div className="grupo-input">
              <label>Descripción Corta (Para el catálogo):</label>
              <input
                type="text"
                name="descripcion_corta"
                value={producto.descripcion_corta}
                onChange={handleChange}
                maxLength="60"
                required
              />
            </div>

            <div className="grupo-input">
              <label>Descripción Larga (Detalle completo):</label>
              <textarea
                name="descripcion_larga"
                className="form-control"
                value={producto.descripcion_larga}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="grupo-input mt-4 p-3 border rounded bg-light">
              <h5>Configuración de Imagen</h5>
              <label className="mt-2 text-primary fw-bold">
                Nombre del archivo:
              </label>
              <input
                type="text"
                name="imagen"
                value={producto.imagen}
                onChange={handleChange}
                placeholder="Ej: nave-espacial.jpg"
                required
              />
              <small className="d-block mb-3 text-muted">
                * El archivo debe existir en la carpeta /public/img/
              </small>

              <label>Texto Alternativo (Acc - SEO):</label>
              <input
                type="text"
                name="imagen_alt"
                value={producto.imagen_alt}
                onChange={handleChange}
                placeholder="Ej: Juguete de nave espacial azul"
              />

              <label>Título de la imagen:</label>
              <input
                type="text"
                name="imagen_title"
                value={producto.imagen_title}
                onChange={handleChange}
                placeholder="Ej: Haz clic para ver detalles"
              />
            </div>

            <button type="submit" className="btn-espacial w-100 py-2">
              ¡Lanzar al Espacio!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AltaProductos;
