import React, { useState } from 'react';
import carrito from '../imagenes/carrito1.png';
import Registro from './registro';
import Login from './login';
import "../estilos/modal.css";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../imagenes/logo.png';



function NavBar({isAuthenticated, handleLogout,rol,carritoItems}){
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const navigate = useNavigate();

    const handleOpenModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    const handleLogoutAndRedirect = () => {
        handleLogout();
        navigate("/login");
        
    };

    const handleCarritoClick = () => {
        navigate("/carrito");
    };

    

    return(
        <div className="NavBar">
            <img src={Logo} className='logo' />
        
            <ul className="nav">
                <li> <Link to= "/" style={{color:"white"}}>Inicio</Link></li>
                <li> 
                    {isAuthenticated ? (
                    <Link to= "/productos" style={{color:"white"}}>Productos</Link>
                    ) : (<a href='#' style={{color:"white"}} onClick={() => alert("Debes Registrarte e Iniciar Sesion Para Ver Los Productos!")}>Productos</a>)
                }
               </li>
                <li> <Link to= "/registro" style={{color:"white"}} > Registrarse </Link></li>
                {!isAuthenticated && <li><Link to="/login" style={{color:"white"}}>Iniciar Sesion</Link></li>}
                {isAuthenticated && (
                    <li><Link to="/" onClick={handleLogoutAndRedirect} style={{color:"white"}}>Cerrar Sesion</Link></li>
                )}

            </ul>
            <div className="carrito">
                <button onClick={handleCarritoClick}>
                    <img src={carrito} alt="Carrito" />
                    {carritoItems && carritoItems.length > 0 && (
                        <span className="carrito-count">{carritoItems.length}</span>
                    )}
                </button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content"> 
                        <button className="close-modal" onClick={handleCloseModal}> X </button>
                        {modalContent === "registro" && <Registro handleOpenModal= {handleOpenModal}/>}
                        {modalContent === "login" && <Login handleOpenModal= {handleOpenModal}/>}
                    </div>
                </div>
            )}
    
        </div>
    );
};

export default NavBar;
