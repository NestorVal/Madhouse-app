import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
// Importamos tu imagen local
import avatarPlaceholder from '../assets/img/avatar-placeholder.png';

const DashboardCliente = () => {
    const navigate = useNavigate();
    
    // --- ESTADOS DINÁMICOS ---
    const [usuario, setUsuario] = useState({ nombre: "", apellido: "", foto: null });
    const [proximaCita, setProximaCita] = useState(null);

    // --- EL BLINDAJE DE LA IMAGEN ---
    const obtenerImagen = (fotoUsuario) => {
        // 1. Si no hay foto, o es la palabra "null", usamos el placeholder local
        if (!fotoUsuario || fotoUsuario === "null" || fotoUsuario === "") {
            // Si el import local te sigue fallando, cambia 'avatarPlaceholder' por esta URL directa:
            // return "https://ui-avatars.com/api/?name=Cliente&background=C69C3B&color=fff";
            return avatarPlaceholder; 
        }
        
        // 2. Si la foto ya viene con el formato correcto, la devolvemos
        if (fotoUsuario.startsWith('data:image')) {
            return fotoUsuario;
        }
        
        // 3. Si es un Base64 puro de la base de datos, lo ensamblamos
        return `data:image/png;base64,${fotoUsuario}`;
    };

    // --- EFECTO ÚNICO MAESTRO (ACTUALIZADO) ---
    useEffect(() => {
        const cargarDatosYReservas = async () => {
            const datosLocales = JSON.parse(localStorage.getItem("usuario"));
            
            if (datosLocales && datosLocales.idUsuario) {
                try {
                    // 1. TRAER DATOS FRESCOS DEL USUARIO (Para arreglar la foto)
                    const resUsuario = await fetch(`http://localhost:8081/api/usuarios/${datosLocales.idUsuario}`);
                    if (resUsuario.ok) {
                        const usuarioFresco = await resUsuario.json();
                        setUsuario(usuarioFresco); // Dibuja la foto nueva
                        // Sobrescribimos el ticket viejo con la info nueva
                        localStorage.setItem("usuario", JSON.stringify(usuarioFresco)); 
                    } else {
                        setUsuario(datosLocales); // Plan B si el fetch falla
                    }

                    // 2. TRAER LA PRÓXIMA CITA
                    const resCitas = await fetch(`http://localhost:8081/api/reservas/cliente/${datosLocales.idUsuario}`);
                    if (resCitas.ok) {
                        const todasLasReservas = await resCitas.json();
                        const pendientes = todasLasReservas.filter(r => r.estado === 'PENDIENTE');
                        if (pendientes.length > 0) {
                            setProximaCita(pendientes[0]);
                        }
                    }
                } catch (error) {
                    console.error("Error cargando el dashboard:", error);
                }
            }
        };

        cargarDatosYReservas();
    }, []);
    // --- TRADUCTOR DE HORA ---
    const formatearHora = (hora24) => {
        if (!hora24) return "Hora por definir";
        const partes = hora24.split(':');
        let horas = parseInt(partes[0], 10);
        const minutos = partes[1];
        const ampm = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12;
        horas = horas ? horas : 12; 
        return `${horas}:${minutos} ${ampm}`;
    };

    // --- CANCELAR CITA ---
    const cancelarCita = async (idReserva) => {
        const resultado = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#121212',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar cita',
            cancelButtonText: 'Volver'
        });

        if (resultado.isConfirmed) {
            try {
                const respuesta = await fetch(`http://localhost:8081/api/reservas/estado/${idReserva}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ estado: 'CANCELADA' })
                });

                if (respuesta.ok) {
                    Swal.fire('Cancelada', 'Tu cita ha sido cancelada exitosamente.', 'success');
                    // Ocultamos la tarjeta actualizando el estado localmente
                    setProximaCita(null);
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
            }
        }
    };

    // --- SEGURIDAD ---
    const cerrarSesion = () => {
        localStorage.removeItem("usuario"); 
        navigate('/login'); 
    };

    return (
        <div className="container-dashboard">
            {/* --- SECCIÓN 1: MENÚ LATERAL --- */}
            <div className="sidebar-perfil">
                <div className="info-usuario">
                    {/* APLICAMOS LA FUNCIÓN A LA IMAGEN */}
                    <img src={obtenerImagen(usuario.foto)} alt="Foto de perfil" className="foto-circular" />
                    <h3>{usuario.nombre} {usuario.apellido}</h3>
                    <p>Cliente VIP</p>
                </div>
                
                <nav className="menu-lateral">
                    <Link to="/perfil-cliente"><button className="btn-menu btn-perfil">Mi Perfil</button></Link>
                    <Link to="/mis-reservas"><button className="btn-menu btn-reservas">Mis Reservas</button></Link>
                    <Link to="/fidelizacion"><button className="btn-menu btn-fidelizacion">Fidelizacion (Puntos)</button></Link>
                    <Link to="/editar-perfil"><button className="btn-menu btn-editar-perfil">Editar Perfil</button></Link>
                    <button className="btn-menu btn-cerrar-sesion" onClick={cerrarSesion}>Cerrar Sesión</button>
                </nav>
            </div>

            {/* --- SECCIÓN 2: CONTENIDO PRINCIPAL --- */}
            <div className="contenido-dashboard">
                <section className="texto texto-izq">
                    <h2>Bienvenido a tu panel, {usuario.nombre}</h2>
                    <p>Aquí puedes gestionar tus citas y revisar tus beneficios exclusivos.</p>
                </section>

                <div className="tarjetas-resumen">
                    {/* TARJETA A: PRÓXIMA CITA */}
                    {proximaCita ? (
                        <div className="tarjeta-dash">
                            <div className="cabecera-tarjeta">
                                <h3>Proxima Cita</h3>
                            </div>
                            <div className="detalle-cita">
                                <p><strong>Servicio:</strong> {proximaCita.servicio?.nombre || 'Servicio de Barbería'}</p>
                                <p><strong>Fecha:</strong> {proximaCita.fecha}</p>
                                <p><strong>Hora:</strong> {formatearHora(proximaCita.hora)}</p>
                                <p><strong>Barbero:</strong> {proximaCita.barbero?.nombre} {proximaCita.barbero?.apellido}</p>
                            </div>
                            <div className="boton">
                                <button 
                                    id="boton-reservar" className="btn-cancelar-rojo" style={{ width: '100%', backgroundColor: '#d33', color: 'white' }} 
                                    onClick={() => cancelarCita(proximaCita.idReserva)}>Cancelar Cita</button>
                            </div>
                        </div>
                    ) : (
                        <div className="tarjeta-dash" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div className="cabecera-tarjeta">
                                <h3>Proxima Cita</h3>
                            </div>
                            <div className="detalle-cita texto-centro" style={{ padding: '20px 0' }}>
                                <p style={{ color: '#666', marginBottom: '15px' }}>
                                    No tienes citas programadas próximamente.
                                </p>
                            </div>
                            <div className="boton">
                                <Link to="/reservas" style={{ width: '100%' }}>
                                    <button id="boton-reservar" style={{ width: '100%' }}>¡Reserva ahora!</button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* TARJETA B: PUNTOS */}
                    <div className="tarjeta-dash tarjeta-centrada">
                        <div className="cabecera-tarjeta">
                            <h3>Mis Puntos Madhouse</h3>
                        </div>
                        <div className="puntos-info">
                            <h2 className="numero-puntos">1,250</h2>
                            <p>Puntos Acumulados</p>
                        </div>
                        <div className="boton">
                            <button id="boton-horarios" style={{ width: '100%', margin: '0', marginTop: '15px' }}>Canjear Premios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCliente;