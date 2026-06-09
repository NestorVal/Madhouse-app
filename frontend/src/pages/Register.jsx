// Registro: crear nueva cuenta con validación de campos
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import API_URL from "../config"; // configuración centralizada de la URL de la API

const Register = () => {
    const navigate = useNavigate();

    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [fechanacimiento, setFechanacimiento] = useState("");
    const [rol, setRol] = useState("ROLE_CLIENTE"); 
    

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const correoInvalido = correo !== "" && !regexCorreo.test(correo);
    const camposIncompletos = !nombre || !apellido || !correo || !contrasena || !telefono || !direccion || !fechanacimiento;
    const aplicarColorGris = camposIncompletos || correoInvalido;

    const manejarEnvio = async (e) => {
        e.preventDefault();
        
        // Aunque el botón esté bloqueado, mantenemos la alerta por seguridad
        if(camposIncompletos) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor ingresa todos los campos requeridos.',
                icon: 'error',
                confirmButtonColor: '#121212' 
            });
            return; 
        }

        try {
            const respuesta = await fetch(`${API_URL}/api/auth/registrar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    correo,
                    contrasena,
                    telefono,
                    direccion,
                    fechaNacimiento: fechanacimiento,
                    rol 
                })
            });

            if (respuesta.ok) {
                Swal.fire({
                    title: '¡Registro completado!',
                    text: 'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
                    icon: 'success',
                    confirmButtonColor: '#C69C3B' 
                }).then(() => {
                    navigate('/login'); 
                });
            } else {
                const mensajeError = await respuesta.text();
                Swal.fire('Error al registrar', mensajeError || 'No se pudo crear la cuenta.', 'error');
            }

        } catch (error) {
            Swal.fire('Error de conexión', 'No se pudo conectar con el servidor.', 'error');
        }
    };

    return(
        <div className="container-register">
            <form id="seccion-registro" className="caja-formulario" onSubmit={manejarEnvio}>
                <div className="texto">
                    <h2>Registrarse</h2>
                    <p>Únete a la experiencia Madhouse</p>
                </div>
                
                <div className="campos-formulario">
                    <label htmlFor="nombre-reg">Nombre</label>
                    <input type="text" id="nombre-reg" placeholder="Nombre" value={nombre} onChange={(e) =>setNombre(e.target.value)}/>

                    <label htmlFor="apellido-reg">Apellido</label>
                    <input type="text" id="apellido-reg" placeholder="Apellido" value={apellido} onChange={(e) =>setApellido(e.target.value)}/>

                    <label htmlFor="correo-reg">Correo Electrónico</label>
                    <input 
                        type="email" 
                        id="correo-reg" 
                        placeholder="tucorreo@email.com" 
                        value={correo} 
                        onChange={(e) =>setCorreo(e.target.value)}
                        // CP-03: Clase dinámica para poner el borde rojo si el formato es inválido
                        className={correoInvalido ? "input-error" : ""}
                    />
                    
                    <label htmlFor="pass-reg">Contraseña</label>
                    <input type="password" id="pass-reg" placeholder="Crea una contraseña" value={contrasena} onChange={(e) =>setContrasena(e.target.value)}/>
                
                    <label htmlFor="direccion-reg">Dirección</label>
                    <input type="text" id="direccion-reg" placeholder="Dirección" value={direccion} onChange={(e) =>setDireccion(e.target.value)}/>

                    <label htmlFor="tel-reg">Teléfono</label>
                    <input type="tel" id="tel-reg" placeholder="Número de celular" value={telefono} onChange={(e) =>setTelefono(e.target.value)}/>

                    <label htmlFor="feNacimiento-reg">Fecha Nacimiento</label>
                    <input type="date" id="feNacimiento-reg" value={fechanacimiento} onChange={(e) =>setFechanacimiento(e.target.value)}/>

                    <label htmlFor="rol-reg">Tipo de Cuenta</label>
                    <select 
                        id="rol-reg" 
                        value={rol} 
                        onChange={(e) => setRol(e.target.value)}
                        className="input-lila" 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }}
                    >
                        <option value="ROLE_CLIENTE">Soy Cliente</option>
                        <option value="ROLE_BARBERO">Soy Barbero</option>
                    </select>
                </div>

                <div className="boton mt-20">
                    <button 
                        id="boton-reservar" 
                        className="btn-formulario"
                       className={`btn-formulario ${aplicarColorGris ? 'boton-desactivado-visual' : ''}`}
                    >
                        Crear Cuenta
                    </button>
                </div>
                <p className="cambio-form">¿Ya tienes cuenta? 
                    <Link to="/login"> Inicia sesión aquí </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;