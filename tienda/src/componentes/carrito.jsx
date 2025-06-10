import { useNavigate } from "react-router-dom";
import "../estilos/carrito.css";

function carrito({carrito, setCarrito}) {
    const navigate = useNavigate();

    const handleRemoveItem = (id) => {
        const nuevoCarrito = carrito.reduce((acc, item) => {
            if (item._id === id){
                if (item.cantidad > 1) {
                    acc.push({...item, cantidad: item.cantidad - 1});
                }
            } else {
                acc.push(item);
            }

            return acc;
        }, []);
        setCarrito(nuevoCarrito);
    };

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);




    return(
        <div className="carrito">
            {carrito.length === 0 ? (
                <p>El carrito esta vacio</p>
            ) : (
                carrito.map((item, index) => (
                    <div key={index} className="carrito-item">
                        <img 
                        src={`http://localhost:3000/uploads/${item.imagen}`} 
                        alt={item.imagen} 
                        style={{width:"70px", height:"70px"}} 
                        />
                        <strong>{item.nombre}{item.cantidad > 1 && `(${item.cantidad})`}</strong> {""} - ${item.precio * item.cantidad} 
                        <button className="btn-eliminar" onClick={() => handleRemoveItem(item._id)}>X</button>
                    </div>
                ))
            )}
            <div className="carrito-total">
                <strong>Total: ${total.toFixed(2)}</strong>
                <button style={{backgroundColor:"green", borderRadius:"10px", cursor:"pointer",width:"130px", height:"50px",marginTop:"13px"}} onClick={() => navigate("/pago") }>Pagar</button>
            </div>

        </div>
    )
}


export default carrito;