import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const PerfilBarbero = () => {
    // Estado del perfil del barbero
    const [barbero, setBarbero] = useState({
        idUsuario: null,
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        fechaNacimiento: "",
        especialidad: "",
        biografia: "",
        foto: null
    });

    const fotoDefault = "/assets/avatar-placeholder.png";

    // Cargar datos del barbero al iniciar
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
                setBarbero({
                    ...datos,
                    especialidad: datos.especialidad || "No definida",
                    biografia: datos.biografia || ""
                });
            }
        } catch (error) {
            console.error("Error cargando perfil de barbero:", error);
        }
    };

    // Guardar cambios (foto o biografía) en el servidor
    const guardarEnServidor = async (nuevaFoto = barbero.foto, nuevaBio = barbero.biografia, esFoto = false) => {
        const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
        
        if (!usuarioLocal || !usuarioLocal.idUsuario) {
            Swal.fire('Sesión expirada', 'Por favor vuelve a iniciar sesión.', 'warning');
            return;
        }

        const idSeguro = usuarioLocal.idUsuario;

        try {
            const respuesta = await fetch(`http://localhost:8081/api/usuarios/actualizar/${idSeguro}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: barbero.nombre,
                    apellido: barbero.apellido,
                    telefono: barbero.telefono,
                    direccion: barbero.direccion,
                    fechaNacimiento: barbero.fechaNacimiento,
                    especialidad: barbero.especialidad,
                    biografia: nuevaBio, // Enviamos la biografía
                    foto: nuevaFoto      // Enviamos la foto
                })
            });

            if (respuesta.ok) {
                if (esFoto) {
                    usuarioLocal.foto = nuevaFoto;
                    localStorage.setItem("usuario", JSON.stringify(usuarioLocal));
                    Swal.fire({
                        title: '¡Foto actualizada!',
                        icon: 'success',
                        confirmButtonColor: '#C69C3B'
                    }).then(() => window.location.reload());
                } else {
                    Swal.fire({
                        title: '¡Biografía guardada!',
                        text: 'Tu perfil profesional ha sido actualizado.',
                        icon: 'success',
                        confirmButtonColor: '#C69C3B'
                    });
                }
            } else {
                Swal.fire('Error', 'No se pudo guardar en la base de datos.', 'error');
            }
        } catch (error) {
            Swal.fire('Error de conexión', 'No se pudo conectar con el servidor.', 'error');
        }
    };

    // Procesar cambio de foto
    const manejarCambioFoto = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onloadend = () => {
                const resultadoFoto = lector.result;
                setBarbero({ ...barbero, foto: resultadoFoto });
                guardarEnServidor(resultadoFoto, barbero.biografia, true); // true = recarga la página
            };
            lector.readAsDataURL(archivo);
        }
    };

    const manejarCambioBio = (e) => {
        setBarbero({ ...barbero, biografia: e.target.value });
    };

    return (
        <main className="pagina-fondo-gris">
            <div className="container-perfil-cliente">
                <div className="contenido-perfil-cliente">
                    <Link to="/dashboard-barbero" className="link-volver">← Volver al Dashboard</Link>

                    <h1 className="titulo-seccion texto-centro mt-20" style={{fontSize: '48px', color: '#121212'}}>Mi perfil</h1>

                    <div className="tarjeta-perfil-lila tarjeta-barbero">
                        <div className="avatar-perfil centrado">
                            {/* Foto de perfil del barbero */}
                            <img src={barbero.foto || fotoDefault} alt={barbero.nombre} />
                            <label htmlFor="input-foto-barbero" className="badge-edit">
                                ✎
                                <input 
                                    id="input-foto-barbero"
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
                            <div className="dato"><strong>Nombre</strong> <span>{barbero.nombre} {barbero.apellido}</span></div>
                            <div className="dato"><strong>Email</strong> <span className="link-correo">{barbero.correo}</span></div>
                            <div className="dato"><strong>Teléfono</strong> <span>{barbero.telefono || "No registrado"}</span></div>
                            <div className="dato"><strong>Fecha de nacimiento</strong> <span>{barbero.fechaNacimiento || "No registrada"}</span></div>
                        </div>

                        <section className="texto-interno mt-20">
                            <h3>Información profesional</h3>
                        </section>
                        
                        <div className="formulario-profesional">
                            <label>Especialidades</label>
                            <input 
                                type="text" 
                                value={barbero.especialidad} 
                                readOnly 
                                className="input-lila" 
                            />

                            <label>Biografía</label>
                            <textarea 
                                placeholder="Escribe tu biografía profesional aquí para que los clientes te conozcan..." 
                                rows="4" 
                                className="input-lila"
                                value={barbero.biografia}
                                onChange={manejarCambioBio}
                            ></textarea>
                            
                            {/* Guardar biografía */}
                            <button 
                                type="button" 
                                className="btn-tarjeta-oscuro mt-10" 
                                style={{ padding: '8px 15px', fontSize: '14px', width: 'auto' }}
                                onClick={() => guardarEnServidor(barbero.foto, barbero.biografia, false)}
                            >
                                Guardar Biografía
                            </button>
                        </div>

                        {/* Editar datos personales */}
                        <div className="boton-centro mt-20">
                            <Link to="/editar-perfil-barbero" style={{ width: '100%' }}>
                                <button className="btn-tarjeta-oscuro btn-ancho">Editar datos personales</button>
                            </Link>
                        </div>
                    </div>

                    <div className="tarjeta-perfil-lila tarjeta-estadisticas-mini">
                        <h3>Estadísticas generales</h3>
                        <div className="stats-row">
                            <div className="stat-item-row">
                                <span className="icono-grande">✂</span>
                                <div>
                                    <h4 className="numero-medio">49</h4>
                                    <p>Servicios totales</p>
                                </div>
                            </div>
                            <div className="stat-item-row estrellas">
                                <span>☆☆☆☆☆</span>
                            </div>
                        </div>
                    </div>

                    <div className="acciones-footer-perfil">
                        <button className="btn-tarjeta-oscuro btn-full-width">Cambiar contraseña</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PerfilBarbero;