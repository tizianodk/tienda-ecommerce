import React, { useState } from 'react';
import "../estilos/modal.css"
import {useNavigate} from 'react-router-dom';

function Registro() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/usuarios/register",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(response.ok){
                const data = await response.json();
                alert("Usuario registrado con éxito");
                console.log(data);
                navigate("/login");
            } else{
                alert("Error al registrar el usuario");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al registrar el usuario");
        }
    };


    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h1 className='titulo'>Registro</h1>

                <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Nombre" 
                value={formData.nombre}
                onChange={handleChange}
                required 
                />
                
                <br />

                <input 
                type="text" 
                id="apellido" 
                name="apellido" 
                placeholder="Apellido" 
                value={formData.apellido}
                onChange={handleChange}
                required 
                />
                
                <br />

                <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required 
                />
                
                <br />
                
                <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Contrasena" 
                value={formData.password}
                onChange={handleChange}
                required 
                />
                
                <br />
                
                <button className='submit' type="submit">Registrarse</button>
                <br />
                
                <p>¿Ya tienes una cuenta? <a href="#" onClick={() =>  navigate("/login")}>Iniciar sesión</a></p> 
                <br />
                <p>Al registrarte, aceptas nuestros <a href="#">Términos de servicio</a> y <a href="#">Política de privacidad</a>.</p>


            </form>
        </div>
    )
}

export default Registro 