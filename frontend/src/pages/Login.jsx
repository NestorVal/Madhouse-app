// --- 1. IMPORTACIONES ---
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Swal from 'sweetalert2';

const Login = () => {
    // --- 2. ESTADO (MEMORIA INDIVIDUAL) ---
    // A diferencia de EditarPerfil, aquí guardamos cada dato en una variable separada.
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    
    // --- 3. FUNCIONES LÓGICAS ---
    const manejarEnvio = (e) => {
        e.preventDefault();
        
        // Lógica condicional: Operador OR (||). "Si el correo está vacío O la contraseña está vacía..."
        if(correo === "" || contrasena === "") {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor ingresa tu correo y contraseña.',
                icon: 'error',
                confirmButtonColor: '#121212'
            });
            return; // Interrupción: Impide que el código siga si hay un error.
        }

        // Si pasó la validación de arriba, ejecuta el "éxito".
        console.log("Datos a enviar al backend:", correo, contrasena);
        
        Swal.fire({
            title: '¡Bienvenido!',
            text: 'Sesión iniciada correctamente.',
            icon: 'success',
            confirmButtonColor: '#C69C3B'
        });
    };

    // --- 4. RENDERIZADO VISUAL ---
    return(
        <div className="container-login">
            {/* Evento 'onSubmit' atado a la función de validación */}
            <form className="caja-formulario" onSubmit={manejarEnvio}>
                <div className="texto">
                    <h2>Iniciar Sesion</h2>
                </div>
                <div className="campos-formulario">
                    <label>Correo</label>
                    <input type="email"
                        placeholder="Correo electronico"
                        value={correo} // Atado a la variable de estado
                        onChange={(e) => setCorreo(e.target.value)} // Función anónima para actualizar la variable
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
                {/* Enlace para ir al registro sin recargar página */}
                <p className="cambio-form">
                    ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link> 
                </p>
            </form>
        </div>
    );
};  
export default Login;