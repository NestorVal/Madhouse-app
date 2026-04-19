// Registro: crear nueva cuenta con validación de campos
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Agregamos useNavigate para redirigir tras registrarse
import Swal from 'sweetalert2';

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
    //El rol por defecto será Cliente
    const [rol, setRol] = useState("ROLE_CLIENTE"); 

    // Enviar formulario al backend
    const manejarEnvio = async (e) => {
        e.preventDefault();
        
        // Validar que ningún campo esté vacío
        if(nombre === "" || apellido === "" || correo === "" || contrasena === "" || telefono === "" || direccion === "" || fechanacimiento === "") {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor ingresa todos los campos requeridos.',
                icon: 'error',
                confirmButtonColor: '#121212' 
            });
            return; 
        }

        try {
            // Solicitar al backend: POST /api/auth/registrar
            const respuesta = await fetch('http://localhost:8081/api/auth/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    correo,
                    contrasena,
                    telefono,
                    direccion,
                    fechaNacimiento: fechanacimiento, // Mapeamos al nombre que espera Spring Boot
                    rol // Enviamos el rol seleccionado
                })
            });


            // Si el registro fue exitoso
            if (respuesta.ok) {
                Swal.fire({
                    title: '¡Registro completado!',
                    text: 'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
                    icon: 'success',
                    confirmButtonColor: '#C69C3B' 
                }).then(() => {
                    // Redirigimos automáticamente al Login después de darle "OK" a la alerta
                    navigate('/login'); 
                });
            } else {
                // Si el backend rechaza el registro (ej. correo ya existe)
                const mensajeError = await respuesta.text();
                Swal.fire('Error al registrar', mensajeError || 'No se pudo crear la cuenta.', 'error');
            }

        } catch (error) {
            Swal.fire('Error de conexión', 'No se pudo conectar con el servidor.', 'error');
        }
    };

    // --- 3. RENDERIZADO VISUAL ---
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
                    <input type="email" id="correo-reg" placeholder="tucorreo@email.com" value={correo} onChange={(e) =>setCorreo(e.target.value)}/>
                    
                    <label htmlFor="pass-reg">Contraseña</label>
                    <input type="password" id="pass-reg" placeholder="Crea una contraseña" value={contrasena} onChange={(e) =>setContrasena(e.target.value)}/>
                
                    <label htmlFor="direccion-reg">Dirección</label>
                    <input type="text" id="direccion-reg" placeholder="Dirección" value={direccion} onChange={(e) =>setDireccion(e.target.value)}/>

                    <label htmlFor="tel-reg">Teléfono</label>
                    <input type="tel" id="tel-reg" placeholder="Número de celular" value={telefono} onChange={(e) =>setTelefono(e.target.value)}/>

                    <label htmlFor="feNacimiento-reg">Fecha Nacimiento</label>
                    <input type="date" id="feNacimiento-reg" value={fechanacimiento} onChange={(e) =>setFechanacimiento(e.target.value)}/>

                    {/* --- NUEVO CAMPO: SELECCIÓN DE ROL --- */}
                    <label htmlFor="rol-reg">Tipo de Cuenta</label>
                    <select 
                        id="rol-reg" 
                        value={rol} 
                        onChange={(e) => setRol(e.target.value)}
                        className="input-lila" // Asegúrate de tener una clase CSS para que combine con tus inputs
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '15px' }} // Estilos de respaldo
                    >
                        <option value="ROLE_CLIENTE">Soy Cliente</option>
                        <option value="ROLE_BARBERO">Soy Barbero</option>
                    </select>
                </div>

                <div className="boton mt-20">
                    <button id="boton-reservar" className="btn-formulario">Crear Cuenta</button>
                </div>
                <p className="cambio-form">¿Ya tienes cuenta? 
                    <Link to="/login"> Inicia sesión aquí </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;