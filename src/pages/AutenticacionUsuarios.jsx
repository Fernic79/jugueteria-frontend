import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usarCarrito } from "../context/CarritoContext";

const Autenticacion = () => {
  const { sincronizarCarrito } = usarCarrito();
  const [esLogin, setEsLogin] = useState(true);
  const [datos, setDatos] = useState({ nombre: "", email: "", password: "" });
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const ruta = esLogin ? "/usuarios/login" : "/usuarios/registro";

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}${ruta}`,
        datos,
      );

      if (esLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
        await sincronizarCarrito();
        alert(`¡Bienvenido cadete ${res.data.usuario.nombre}!`);
        window.location.href = "/catalogo";
      } else {
        alert("Registro exitoso. ¡Ahora logueate!");
        setEsLogin(true);
      }
    } catch (error) {
      alert(error.response?.data?.mensaje || "Error en la misión");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4 contenedor-cosmico shadow-lg">
        <h2 className="text-center mb-4">
          {esLogin ? "🛸 Identificación" : "👨‍🚀 Reclutamiento"}
        </h2>
        <form onSubmit={manejarEnvio}>
          {!esLogin && (
            <div className="mb-3">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={datos.nombre}
                onChange={manejarCambio}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={datos.email}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={datos.password}
              onChange={manejarCambio}
              required
            />
          </div>
          <button type="submit" className="btn-espacial w-100 mb-3">
            {esLogin ? "Ingresar al Espacio" : "Unirse a la Misión"}
          </button>
        </form>

        {/* BOTÓN DE CAMBIO DE ESTADO (Fuera del form) */}
        <button
          type="button"
          className="btn btn-link w-100 text-dark"
          onClick={() => setEsLogin(!esLogin)}
        >
          {esLogin
            ? "¿No tenés cuenta? Registrate aquí"
            : "¿Ya sos cadete? Iniciá sesión"}
        </button>
      </div>
    </div>
  );
};

export default Autenticacion;
