// Login: validar credenciales y guardar sesión en localStorage
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    // Estados del formulario
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navigate = useNavigate(); 
    
    // Enviar credenciales al backend y guardar sesión
    const manejarEnvio = async (e) => {
        e.preventDefault();
        
        // Validar que no estén vacíos
        if(correo === "" || contrasena === "") {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor ingresa tu correo y contraseña.',
                icon: 'error',
                confirmButtonColor: '#121212'
            });
            return;
        }

        try {
            // Solicitar al backend: POST /api/auth/login
            const respuesta = await fetch('http://localhost:8081/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, contrasena })
            });

            const datos = await respuesta.json();

            // Si el servidor responde "success", guardar en localStorage
            if (respuesta.ok && datos.status === "success") {
                localStorage.setItem("usuario", JSON.stringify(datos));

                Swal.fire({
                    title: '¡Bienvenido!',
                    text: datos.mensaje,
                    icon: 'success',
                    confirmButtonColor: '#C69C3B'
                });

                // Redirigir según el rol
                if (datos.rol === 'ROLE_BARBERO') {
                    navigate('/dashboard-barbero');
                } else {
                    navigate('/dashboard-cliente');
                }

            } else {
                Swal.fire({
                    title: 'Error al ingresar',
                    text: datos.mensaje || 'Credenciales inválidas',
                    icon: 'error',
                    confirmButtonColor: '#121212'
                });
            }

        } catch (error) {
            console.error("Error conectando con el servidor:", error);
            Swal.fire({
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor. Intenta más tarde.',
                icon: 'error',
                confirmButtonColor: '#121212'
            });
        }
    };

    return(
        <div className="container-login">
            <form className="caja-formulario" onSubmit={manejarEnvio}>
                <div className="texto">
                    <h2>Iniciar Sesión</h2>
                </div>
                <div className="campos-formulario">
                    <label>Correo</label>
                    <input type="email"
                        placeholder="Correo electrónico"
                        value={correo} 
                        onChange={(e) => setCorreo(e.target.value)} 
                    />
                    
                    <label>Contraseña</label>
                    <input type="password"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <div className="boton">
                    <button type="submit" className="btn-formulario">Ingresar</button>
                </div>
                <p className="cambio-form">
                    ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link> 
                </p>
            </form>
        </div>
    );
};  
export default Login;