import React, { useState, useEffect } from "react";
import "../estilos/adminPanel.css";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
  });

  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [imagenActual, setImagenActual] = useState(null); // Para mostrar imagen actual en edición

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await fetch("http://localhost:3000/productos");
      const data = await res.json();
      setProductos(data || []);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      imagen: file,
    });
  };

  const editarProducto = (producto) => {
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: null, // Resetear el input de archivo
    });
    setModoEdicion(true);
    setIdEditando(producto._id);
    setImagenActual(producto.imagen); // Guardar imagen actual para mostrar
  };

  const cancelarEdicion = () => {
    setForm({ nombre: "", descripcion: "", precio: "", imagen: null });
    setModoEdicion(false);
    setIdEditando(null);
    setImagenActual(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("precio", form.precio);
    formData.append("descripcion", form.descripcion);

    if (form.imagen) {
      formData.append("imagen", form.imagen);
    }

    const url = modoEdicion
      ? `http://localhost:3000/productos/editar/${idEditando}`
      : "http://localhost:3000/productos";
    const method = modoEdicion ? "PUT" : "POST";

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`, // <-- Aquí anades el token
        },
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const textResponse = await res.text();
        console.error("Respuesta como texto:", textResponse);
        throw new Error(
          `El servidor devolvió HTML en lugar de JSON. Status: ${res.status}`
        );
      }

      if (res.ok) {
        alert(modoEdicion ? "Producto actualizado" : "Producto agregado");
        setForm({ nombre: "", descripcion: "", precio: "", imagen: null });
        setModoEdicion(false);
        setIdEditando(null);
        setImagenActual(null);
        fetchProductos();
      } else {
        console.error("Error del servidor:", data);
        alert("Error: " + (data.message || data.error || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error en la petición: " + error.message);
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:3000/productos/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // <-- Aquí también anades el token
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert("Producto eliminado");
          fetchProductos();
        } else {
          alert("Error al eliminar: " + (data.message || data.error || "Error desconocido"));
        }
      } catch (error) {
        alert("Error en la petición: " + error.message);
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="titulo">{modoEdicion ? "Editar Producto" : "Agregar Producto"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded mb-2 w-full"
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="border p-2 rounded mb-2 w-full"
          required
        />

        <textarea
          rows="6"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="descripcion border p-2 rounded mb-4 w-full"
          required
        />

        <label>IMAGEN:</label>

        {modoEdicion && imagenActual && (
          <div className="mb-2">
            <p className="text-sm text-gray-600">Imagen actual:</p>
            <img
              src={`http://localhost:3000/uploads/${imagenActual}`}
              alt="Imagen actual"
              style={{ width: "100px", marginBottom: "10px", borderRadius: "10px", display: "flex", marginLeft: "auto", marginRight: "auto" }}
            />
            <p className="text-sm text-gray-500">
              Selecciona una nueva imagen solo si quieres cambiarla
            </p>
          </div>
        )}

        <input
          type="file"
          name="imagen"
          onChange={handleFileChange}
          className="border p-2 rounded mb-4 w-full"
          accept="image/*"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex-1"
            style={{ marginRight: "10px" }}
          >
            {modoEdicion ? "Actualizar Producto" : "Guardar Producto"}
          </button>
          <button onClick={() => navigate("/admin/historial")} style={{display:"flex", marginTop:"10px"}}>Ver Historial</button>

          {modoEdicion && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
     

        <h3 className="titulo">Productos Existentes</h3>
      <div className="items mt-6">
        {productos.length === 0 && <p>No hay productos aún.</p>}
        {productos.map((p) => (
          <div
            key={p._id}
            className="itemss "
          >
            <div>
              <strong>{p.nombre}</strong> - ${p.precio}
              <p style={{overflow:"scroll", overflowX:"hidden",height:"120px"}}><strong>Descripcion: </strong>{p.descripcion}</p>
              {p.imagen && (
                <img
                  src={`http://localhost:3000/uploads/${p.imagen}`}
                  alt={p.nombre}
                  style={{ width: "100px", height:"102px", marginTop: "5px", borderRadius: "10px" }}
                />
              )}
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => editarProducto(p)}
                style={{ margin: "10px" }}
              >
                Editar
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => eliminarProducto(p._id)}
              >
                Eliminar
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
