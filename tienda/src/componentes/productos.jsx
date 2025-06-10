import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/productos.css";


function Productos() {
    

    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch("http://localhost:3000/productos");
                
                if (!response.ok) {
                    throw new Error("Error en la respuesta de la API");
                }
                const data = await response.json();
                console.log(data);
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };

        fetchProductos();
    }, []);
    
    
    return(
        <div className='productos'>
            <h1 className='titulo'>Productos</h1>
                <div className="producto">
                    {Array.isArray(productos) && productos.length > 0 ? (
                        productos.map((producto) => (
                            <div key={producto._id} className="producto-item">
                                    <img src={`http://localhost:3000/uploads/${producto.imagen}`} alt={producto.nombre} />
                                    <h1>{producto.nombre}</h1>
                                    <div className='botones'>
                                        <button onClick={() => { navigate(`/producto/${producto._id}`) }} > Detalles </button>
                                        
                                    </div>
                                </div>
                    ))
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                </div>

        </div>
    )
};

export default Productos;