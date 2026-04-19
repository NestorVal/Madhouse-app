import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const PerfilCliente = () => {
    // --- ESTADOS ---
    const [usuario, setUsuario] = useState({
        idUsuario: null,
        nombre: "",
        apellido: "",
        correo: "",
        direccion: "",
        telefono: "",
        fechaNacimiento: "",
        foto: null
    });

    const fotoDefault = "/assets/avatar-placeholder.png";

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
                const datos = await respuesta.json();
                setUsuario(datos);
            }
        } catch (error) {
            console.error("Error cargando perfil:", error);
        }
    };

    // --- 3. EL CICLO PUT: GUARDAR LA FOTO EN EL SERVIDOR ---
    const guardarFotoEnServidor = async (foto) => {
        // 1. BLINDAJE: Sacamos el ID directamente del LocalStorage
        const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
        const idSeguro = usuarioLocal.idUsuario; // Esto nunca será null si inició sesión

        try {
            // 2. Usamos idSeguro y tu puerto 8081
            const respuesta = await fetch(`http://localhost:8081/api/usuarios/actualizar/${idSeguro}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    telefono: usuario.telefono,
                    direccion: usuario.direccion,
                    fechaNacimiento: usuario.fechaNacimiento,
                    foto: foto
                })
            });

            if (respuesta.ok) {
                // Actualizamos la memoria local
                usuarioLocal.foto = foto;
                localStorage.setItem("usuario", JSON.stringify(usuarioLocal));

                Swal.fire({
                    title: '¡Foto actualizada!',
                    icon: 'success',
                    confirmButtonColor: '#C69C3B'
                });
            } else {
                Swal.fire('Error', 'No se pudo guardar en la base de datos.', 'error');
            }
        } catch (error) {
            Swal.fire('Error de conexión', 'No se pudo conectar con el servidor.', 'error');
        }
    };

    // --- CONVERTIR FOTO A TEXTO ---
    const manejarCambioFoto = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onloadend = () => {
                const resultadoFoto = lector.result;
                setUsuario({ ...usuario, foto: resultadoFoto });
                guardarFotoEnServidor(resultadoFoto);
            };
            lector.readAsDataURL(archivo);
        }
    };

    // --- RENDERIZADO VISUAL ---
    return (
        <div className="container-perfil-cliente">
            <div className="contenido-perfil-cliente">
                <Link to="/dashboard-cliente" className="link-volver">← Volver al Dashboard</Link>

                <section className="texto">
                    <h2>Mi perfil</h2>
                </section>

                <div className="tarjeta-perfil-lila">
                    <div className="avatar-perfil">
                        <img src={usuario.foto || fotoDefault} alt={usuario.nombre} />
                        <label htmlFor="input-foto" className="badge-edit">
                            ✎
                            <input 
                                id="input-foto"
                                type="file" 
                                accept="image/*"
                                onChange={manejarCambioFoto}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>

                    <section className="texto-interno">
                        <h3>Información personal</h3>
                    </section>

                    <div className="datos-cliente">
                        <div className="dato"><strong>Nombre</strong> <span>{usuario.nombre} {usuario.apellido}</span></div>
                        <div className="dato"><strong>Email</strong> <span>{usuario.correo}</span></div>
                        <div className="dato"><strong>Teléfono</strong> <span>{usuario.telefono || "No registrado"}</span></div>
                        <div className="dato"><strong>Fecha de nacimiento</strong> <span>{usuario.fechaNacimiento || "No registrada"}</span></div>
                    </div>
                </div>

                <div className="tarjeta-perfil-lila">
                    <section className="texto-interno">
                        <h3>Estadísticas personales</h3>
                    </section>
                    <div className="stats-container">
                        <div className="stat-item">
                            <span className="icon">⭐</span>
                            <div><p>Servicios tomados</p><h4>12</h4></div>
                        </div>
                        <div className="stat-item">
                            <span className="icon">⭐</span>
                            <div><p>Puntos de fidelización</p><h4>230</h4></div>
                        </div>
                        <div className="stat-item">
                            <span className="icon">✂</span>
                            <div><p>Barbero favorito</p><h4>Alexander</h4></div>
                        </div>
                    </div>
                </div>

                <div className="acciones-footer-perfil">
                    <div className="boton">
                        <Link to="/cambiar-contrasena">
                            <button id="btn-cambiar-pass" className="btn-full-width">Cambiar contraseña</button>
                        </Link>
                    </div>
                    <div className="boton">
                        <Link to="/editar-perfil">
                            <button id="btn-editar-perfil" className="btn-full-width">Editar perfil</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilCliente;