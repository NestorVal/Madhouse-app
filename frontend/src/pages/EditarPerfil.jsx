// --- IMPORTACIONES ---
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditarPerfil = () => {
    // --- ESTADO (MEMORIA PRECÁRGADA) ---
    // Usamos useState para inicializar el formulario con información "falsa" de la BD.
    // Esto permite que los inputs no arranquen vacíos.
    const [datos, setDatos] = useState({
        nombre: "Camilo",
        apellido: "Perez",
        correo: "perez.camilo@gmail.com",
        telefono: "3132852821",
        fechaNacimiento: "1990-03-15"
    });

    // --- FUNCIONES LÓGICAS ---
    
    // Función global para manejar cualquier input del formulario.
    const manejarCambio = (e) => {
        // e.target.name: Lee el atributo 'name' del input que se está modificando (ej. "nombre" o "telefono").
        // e.target.value: Lee lo que el usuario está escribiendo.
        // Copiamos los datos anteriores (...datos) y sobreescribimos solo el campo que cambió.
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

     const guardarCambios
      = (e) => {
            e.preventDefault(); // Evita que el formulario recargue la página al hacer submit.
    
            // Si todo está lleno, simulamos el envío (Alerta de Éxito)
            console.log("Datos actualizados:", datos);
            
            // Usamos SweetAlert para mostrar una alerta personalizada.
            Swal.fire({
                title: '¡Perfil actualizado!',
                text: 'Tus datos han sido modificados correctamente.',
                icon: 'success',
                confirmButtonColor: '#C69C3B' // Tu color dorado
            });
        };
    // --- RENDERIZADO VISUAL ---
    return (
        <main className="pagina-fondo-gris">
            <div className="container-reserva" style={{ paddingTop: '40px' }}>
                <Link to="/perfil-cliente" className="link-volver">← Cancelar y Volver</Link>
                
                <form className="caja-formulario" onSubmit={guardarCambios}>
                    <section className="texto texto-centro">
                        <h2>Editar Mi Perfil</h2>
                        <p>Actualiza tu información personal</p>
                    </section>
                    {/* ... (Encabezados) ... */}
                    <div className="campos-formulario">
                        <label>Nombre</label>
                        {/* Conexión del input al Estado:
                            value={datos.nombre}: Muestra el dato guardado en memoria.
                            name="nombre": Clave para que la función manejarCambio sepa qué modificar.
                            onChange: Llama a la función cada vez que se presiona una tecla.
                        */}
                        <input type="text" name="nombre" value={datos.nombre} onChange={manejarCambio} required />

                        <label>Apellido</label>
                        <input type="text" name="apellido" value={datos.apellido} onChange={manejarCambio} required />

                        <label>Correo Electrónico (No editable)</label>
                        {/* Input deshabilitado (disabled) porque normalmente el correo no se cambia así nomás */}
                        <input type="email" name="correo" value={datos.correo} disabled style={{ backgroundColor: '#e9ecef' }} />

                        <label>Teléfono</label>
                        <input type="tel" name="telefono" value={datos.telefono} onChange={manejarCambio} required />

                        <label>Fecha de Nacimiento</label>
                        <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento} onChange={manejarCambio} required />
                    </div>

                    <div className="boton grupo-botones mt-20">
                        {/* type="button" asegura que este botón no envíe el formulario por accidente */}
                        <Link to="/perfil-cliente" style={{ width: '100%' }}>
                            <button type="button" className="btn-formulario btn-secundario" style={{ width: '100%' }}>Cancelar</button>
                        </Link>
                        {/* type="submit" gatilla la función 'onSubmit' del <form> */}
                        <button type="submit" className="btn-formulario">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditarPerfil;