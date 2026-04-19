import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditarPerfil = () => {
    const navigate = useNavigate();

    // --- ESTADO INICIAL ---
    const [datos, setDatos] = useState({
        idUsuario: null,
        nombre: "",
        apellido: "",
        correo: "",
        direccion: "",
        telefono: "",
        fechaNacimiento: "",
        foto: null
    });

    // --- CARGA INICIAL (GET) ---
    useEffect(() => {
        const datosLocales = JSON.parse(localStorage.getItem("usuario"));
        if (datosLocales && datosLocales.idUsuario) {
            cargarDatosServidor(datosLocales.idUsuario);
        }
    }, []);

    const cargarDatosServidor = async (id) => {
        try {
            const respuesta = await fetch(`http://localhost:8081/api/usuarios/${id}`);
            if (respuesta.ok) {
                const data = await respuesta.json();
                setDatos(data); // Rellenamos el formulario con lo que viene de la BD
            }
        } catch (error) {
            console.error("Error cargando perfil:", error);
        }
    };

    // --- MANEJO DE INPUTS ---
    const manejarCambio = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    // --- GUARDAR DATOS (PUT) ---
    const guardarCambios = async (e) => {
        e.preventDefault(); 
        
        // 1. BLINDAJE: Sacamos el ID seguro
        const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
        const idSeguro = usuarioLocal.idUsuario;
        
        try {
            // 2. Usamos el puerto 8081 y el idSeguro
            const respuesta = await fetch(`http://localhost:8081/api/usuarios/actualizar/${idSeguro}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    telefono: datos.telefono,
                    direccion: datos.direccion,
                    fechaNacimiento: datos.fechaNacimiento,
                    foto: datos.foto 
                })
            });

            // ... (el resto del código del if (respuesta.ok) se mantiene igual)

            if (respuesta.ok) {
                // Actualizamos el nombre en el localStorage por si cambió
                const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
                usuarioLocal.nombre = datos.nombre;
                localStorage.setItem("usuario", JSON.stringify(usuarioLocal));

                Swal.fire({
                    title: '¡Perfil actualizado!',
                    text: 'Tus datos han sido modificados correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#C69C3B'
                }).then(() => {
                    navigate('/perfil-cliente'); // Redirigimos a la vista de perfil
                });
            } else {
                Swal.fire('Error', 'No se pudieron actualizar los datos.', 'error');
            }
        } catch (error) {
            Swal.fire('Error de conexión', 'No se pudo conectar con el servidor.', 'error');
        }
    };

    // --- RENDERIZADO VISUAL ---
    return (
        <main className="pagina-fondo-gris">
            <div className="container-reserva" style={{ paddingTop: '40px' }}>
                <Link to="/perfil-barbero" className="link-volver">← Cancelar y Volver</Link>
                
                <form className="caja-formulario" onSubmit={guardarCambios}>
                    <section className="texto texto-centro">
                        <h2>Editar Mi Perfil</h2>
                        <p>Actualiza tu información personal</p>
                    </section>
                    
                    <div className="campos-formulario">
                        <label>Nombre</label>
                        <input type="text" name="nombre" value={datos.nombre || ""} onChange={manejarCambio} required />

                        <label>Apellido</label>
                        <input type="text" name="apellido" value={datos.apellido || ""} onChange={manejarCambio} required />

                        <label>Correo Electrónico (No editable)</label>
                        <input type="email" name="correo" value={datos.correo || ""} disabled style={{ backgroundColor: '#e9ecef' }} />

                        <label>Teléfono</label>
                        <input type="tel" name="telefono" value={datos.telefono || ""} onChange={manejarCambio} required />

                        <label>Dirección</label>
                        <input type="text" name="direccion" value={datos.direccion || ""} onChange={manejarCambio} required />

                        <label>Fecha de Nacimiento</label>
                        <input type="date" name="fechaNacimiento" value={datos.fechaNacimiento || ""} onChange={manejarCambio} required />
                    </div>

                    <div className="boton grupo-botones mt-20">
                        <Link to="/perfil-cliente" style={{ width: '100%' }}>
                            <button type="button" className="btn-formulario btn-secundario" style={{ width: '100%' }}>Cancelar</button>
                        </Link>
                        <button type="submit" className="btn-formulario">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditarPerfil;