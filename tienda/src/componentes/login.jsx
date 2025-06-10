import React, { useState } from 'react';
import "../estilos/modal.css";
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuthenticated, setRol, handleOpenModal }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        alert("Inicio de sesión exitoso");

        setIsAuthenticated(true);
        setRol(data.user.rol);

        // Guardar token y datos de usuario
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("nombre", data.user.nombre);
        localStorage.setItem("rol", data.user.rol);

        if (data.user.rol === "admin") {
          navigate("/admin");
        } else if (data.user.rol === "cliente") {
          navigate("/productos");
        }
      } else {
        alert("Error al iniciar sesión, alguna de las credenciales es incorrecta");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className='titulo'>Iniciar Sesion</h1>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br />

        <input
          type="password"
          placeholder="Contrasena"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br />

        <button className="submit" type="submit">Iniciar Sesion</button>
        <br />
        <p>¿No tienes una cuenta? <Link to="/registro"><a href="#" onClick={() => handleOpenModal("registro")}>Registrarse</a></Link></p>
        <br />
      </form>
    </div>
  );
}

export default Login;
