import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CarritoContexto = createContext();

const GestorCarrito = ({ children }) => {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    obtenerCarrito();
  }, []);

  //Cálculo del total para usuarios invitados (sin login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const total = itemsCarrito.reduce(
        (acc, item) =>
          acc + (item.producto?.precio || item.precio || 0) * item.cantidad,
        0,
      );
      setPrecioTotal(total);
      //Guarda en el almacenamiento local para que no se pierda al recargar
      localStorage.setItem("carrito_invitado", JSON.stringify(itemsCarrito));
    }
  }, [itemsCarrito]);

  //Trae los productos del carrito (desde DB o LocalStorage)
  const obtenerCarrito = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await axios.get(`${API_URL}/carrito`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItemsCarrito(data.items || []);
        setPrecioTotal(data.total || 0);
      } catch (error) {
        console.error("Error al traer el carrito de la base de datos", error);
      }
    } else {
      const localData =
        JSON.parse(localStorage.getItem("carrito_invitado")) || [];
      setItemsCarrito(localData);
    }
  };

  //Agregar o modificar cantidad
  const agregarAlCarrito = async (producto, cantidad) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(
          `${API_URL}/carrito`,
          { productoId: producto._id, cantidad },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        obtenerCarrito(); //Datos reales desde el servidor
      } catch (error) {
        alert("No se pudo actualizar el carrito en el servidor.");
      }
    } else {
      setItemsCarrito((prev) => {
        const existe = prev.find((item) => item.producto._id === producto._id);
        if (existe) {
          return prev.map((item) =>
            item.producto._id === producto._id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item,
          );
        }
        return [...prev, { producto, cantidad, precio: producto.precio }];
      });
    }
  };

  //Eliminar un producto específico
  const eliminarDelCarrito = async (productoId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(`${API_URL}/carrito/${productoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        obtenerCarrito();
      } catch (error) {
        alert("Error al eliminar el producto de la central de datos.");
      }
    } else {
      setItemsCarrito((prev) =>
        prev.filter((item) => item.producto._id !== productoId),
      );
    }
  };

  //Vaciar todo el carrito (Post-Pago o cancelación)
  const vaciarCarrito = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        //El backend limpia la colección en MongoDB
        await axios.delete(`${API_URL}/carrito/vaciar/todo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItemsCarrito([]);
        setPrecioTotal(0);
      } catch (error) {
        console.error("No se pudo vaciar el carrito en el servidor", error);
      }
    } else {
      localStorage.removeItem("carrito_invitado");
      setItemsCarrito([]);
      setPrecioTotal(0);
    }
  };

  //Pasar carrito de invitado a usuario logueado
  const sincronizarCarrito = async () => {
    const token = localStorage.getItem("token");
    const localItems =
      JSON.parse(localStorage.getItem("carrito_invitado")) || [];

    if (token && localItems.length > 0) {
      try {
        for (const item of localItems) {
          await axios.post(
            `${API_URL}/carrito`,
            { productoId: item.producto._id, cantidad: item.cantidad },
            { headers: { Authorization: `Bearer ${token}` } },
          );
        }
        localStorage.removeItem("carrito_invitado");
        obtenerCarrito();
      } catch (error) {
        console.error("Error al sincronizar la carga de juguetes", error);
      }
    }
  };

  return (
    <CarritoContexto.Provider
      value={{
        itemsCarrito,
        precioTotal,
        cantidadItems: itemsCarrito.length,
        agregarAlCarrito,
        eliminarDelCarrito,
        obtenerCarrito,
        sincronizarCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContexto.Provider>
  );
};

const usarCarrito = () => useContext(CarritoContexto);

export { CarritoContexto, GestorCarrito, usarCarrito };
