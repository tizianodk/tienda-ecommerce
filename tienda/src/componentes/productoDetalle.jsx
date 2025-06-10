import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "../estilos/productoDetalle.css";



function ProductoDetalle({ productos, agregarAlCarrito }) {
    const { id } = useParams();
    const [resenas, setResenas] = useState([]);
    const [nuevaResena, setNuevaResena] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0); 

    useEffect(() => {
        const fetchResenas = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}/resenas`);
                if (!response.ok) {
                    throw new Error("Error al obtener las resenas");
                }
                const data = await response.json();
                setResenas(data.resenas || []);
            } catch (error) {
                console.error("Error al obtener las resenas:", error);
                setResenas([]);
            }
        };

        fetchResenas();
    }, [id]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === resenas.length - 1 ? 0 : prevIndex + 1
            );
        }, 1500); 

        return () => clearInterval(interval);
    }, [resenas]);


    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return <div>Cargando...</div>;
    }

    const producto = productos.find((producto) => producto._id === id);

    if (!producto) {
        return <div>Producto no encontrado</div>;
    }

    const enviarResena = async () => {
        if (nuevaResena.trim() === "") {
            alert("Por favor, escribe una resena antes de enviar.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/productos/${id}/resenas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({  productoId: id, texto: nuevaResena }),
            });
            if (!response.ok) {
                throw new Error("Error al enviar la resena");
            }
            
            const nuevaResenaData = response.json();
            setResenas([...resenas, nuevaResenaData]);
            setNuevaResena("");
        } catch (error) {
            console.error("Error al enviar la resena:", error);
            alert("Error al enviar la resena. Por favor, inténtalo de nuevo.");
        }
    }

    const handleNext = () => {
        if (currentIndex < resenas.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };


    return (
        <div className="producto-detalle">
            <div className='contenedor-detalle'>
                <h2>{producto.nombre}</h2>
                    <div className="carrousel">
                        {Array.isArray(producto.imagenes) ? (
                            producto.imagenes.map((imagen, index) => (
                                <img key={index} src={`http://localhost:3000/uploads/${imagen}`} alt={`Imagen ${index + 1}`} />
                            ))
                        ) : (
                            <img src={`http://localhost:3000/uploads/${producto.imagen}`} alt={producto.nombre} style={{borderRadius:"10px"}} />
                        )}
                    </div>
                    
                        <strong><p>Precio: ${producto.precio}</p></strong>
                        <strong><p>Descripción: <br />{producto.descripcion} </p><br /></strong>
                    
        
                <button onClick={ () => {agregarAlCarrito(producto)}} style={{backgroundColor:"green"}}>Agregar Al Carrito</button> 
            </div>
            <div className='contenedor' style={{display:"flex", justifyContent:"row", gap:"150px"}}>
                <div className='contenedor-opiniones'>
                <h3>Dejar Reseña</h3>
                <textarea
                    placeholder='Escribe tu reseña aquí'
                    value={nuevaResena}
                    onChange={(e) => setNuevaResena(e.target.value)}
                ></textarea>
                <button onClick={enviarResena} style={{ backgroundColor: "green" }}>Enviar</button>
            </div>
            <div className='contenedor-valoracion'>
                <h3 style={{alignItems:"center"}}>Reseñas</h3>
                {resenas.length > 0 ? (
                    <div className="resenas-carrusel"  style={{ transition: "all 0.5s ease-in-out" }}>
                        {/* <button onClick={handlePrev} disabled={currentIndex === 0} style={{borderRadius:"50%", height:"50%", marginTop:"50px"}}>&#10094;</button> */}
                        <div className="resena" >
                            <p style={{ borderBottom: "1px solid #ccc", padding: "5px" }}>
                            {resenas[currentIndex] ? resenas[currentIndex].texto : "No hay reseña disponible"}
                            </p>
                        </div>
                        {/* <button onClick={handleNext} disabled={currentIndex === resenas.length - 1} style={{borderRadius:"50%", height:"50%", marginTop:"50px"}}>&#10095;</button> */}
                    </div>
                ) : (
                    <p>No hay reseñas aún.</p>
                )}
            </div>
            </div>
        </div>
    );
}   

export default ProductoDetalle;  