import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // Agregamos la importación de Link
import Swal from 'sweetalert2';

const Register = () =>{
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [fechanacimiento, setFechanacimiento] = useState("");
    

    const manejarEnvio = (e) => {
        e.preventDefault();
        
        // 1. Validamos si hay campos vacíos (Alerta de Error)
        if(nombre === "" || apellido === "" || correo === "" || contrasena === "" || telefono === "" || direccion === "" || fechanacimiento === "") {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor ingresa todos los campos requeridos.',
                icon: 'error',
                confirmButtonColor: '#121212' // Color oscuro para errores
            });
            return; // Detiene la función para que no continúe
        }

        // 2. Si todo está lleno, simulamos el envío (Alerta de Éxito)
        console.log("Datos a enviar", nombre, apellido, correo, contrasena, telefono, direccion, fechanacimiento);
        
        Swal.fire({
            title: '¡Registro completado!',
            text: 'Tu cuenta ha sido creada correctamente.',
            icon: 'success',
            confirmButtonColor: '#C69C3B' // Tu color dorado
        });
    };

    return(
        <div className="container-register">
        <form id="seccion-registro" className="caja-formulario" onSubmit={manejarEnvio}>
            <div className="texto">
                <h2>Registrarse</h2>
                <p>Unete a la experiencia Madhouse</p>
            </div>
            <div className="campos-formulario">
                <label htmlFor="nombre-reg">Nombre</label>
                <input type="text" id="nombre-reg" placeholder="Nombre" value={nombre} onChange={(e) =>setNombre(e.target.value)}/>

                <label htmlFor="apellido-reg">Apellido</label>
                <input type="text" id="apellido-reg" placeholder="Apellido" value={apellido} onChange={(e) =>setApellido(e.target.value)}/>

                <label htmlFor="correo-reg">Correo Electronico</label>
                <input type="email" id="correo-reg" placeholder="tucorreo@email.com" value={correo} onChange={(e) =>setCorreo(e.target.value)}/>
                
                <label htmlFor="pass-reg">Contraseña</label>
                <input type="password" id="pass-reg" placeholder="Crea una contraseña" value={contrasena} onChange={(e) =>setContrasena(e.target.value)}/>
            
                <label htmlFor="direccion-reg">Direccion</label>
                <input type="text" id="direccion-reg" placeholder="Direccion" value={direccion} onChange={(e) =>setDireccion(e.target.value)}/>

                <label htmlFor="tel-reg">Telefono</label>
                <input type="tel" id="tel-reg" placeholder="Numero de celular" value={telefono} onChange={(e) =>setTelefono(e.target.value)}/>

                <label htmlFor="feNacimiento-reg">Fecha Nacimiento</label>
                <input type="date" id="feNacimiento-reg" value={fechanacimiento} onChange={(e) =>setFechanacimiento(e.target.value)}/>
            </div>
            <div className="boton">
                <button id="boton-reservar" className="btn-formulario">Crear Cuenta</button>
            </div>
            <p className="cambio-form">¿Ya tienes cuenta? 
                <Link to="/login"> Inicia sesion aqui </Link>
            </p>
        </form>
    </div>
    )
}
export default Register;