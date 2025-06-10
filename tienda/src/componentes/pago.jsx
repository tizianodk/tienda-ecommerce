import { useEffect } from "react";

function Pago({ carrito }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!carrito || carrito.length === 0) {
      alert("El carrito está vacío, no se puede procesar el pago");
      return;
    }

    const carritoParaPago = carrito.map(item => ({
    nombre: item.nombre || item.title || "Producto sin nombre",
    precio: item.precio,
    cantidad: item.cantidad,
    productoId: item._id || item.id // <-- ¡este campo es clave!
}));

    console.log("Items para pago:", carritoParaPago);

    const crearSesionPago = async () => {
      try {
        const response = await fetch("http://localhost:3000/usuarios/pago", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ items: carritoParaPago })
        });

        const data = await response.json();
        if (data.url) {
          window.location.href = data.url; 
        } else {
          alert("No se pudo iniciar el proceso de pago");
        }
      } catch (error) {
        console.error("Error al crear sesión de Stripe:", error);
        alert("Hubo un error al intentar procesar el pago");
      }
    };

    crearSesionPago();
  }, [carrito, token]);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Redirigiendo a Stripe...</h2>
    </div>
  );
}

export default Pago;
