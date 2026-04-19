import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Asegúrate de que esta ruta apunte correctamente a tu imagen por defecto
import avatarPlaceholder from '../assets/img/avatar-placeholder.png';

const DashboardBarbero = () => {
    const navigate = useNavigate();
    
    // Estado del barbero y próxima cita
    const [barbero, setBarbero] = useState({ nombre: "", apellido: "", foto: null });
    const [proximaCita, setProximaCita] = useState(null);

    // Procesar imagen de perfil
    const obtenerImagen = (fotoUsuario) => {
        if (!fotoUsuario || fotoUsuario === "null" || fotoUsuario === "") {
            return avatarPlaceholder; 
        }
        if (fotoUsuario.startsWith('data:image')) {
            return fotoUsuario;
        }
        return `data:image/png;base64,${fotoUsuario}`;
    };

    // Convertir hora a formato 12h AM/PM
    const formatearHora = (hora24) => {
        if (!hora24) return "";
        const partes = hora24.split(':');
        let horas = parseInt(partes[0], 10);
        const minutos = partes[1];
        const ampm = horas >= 12 ? 'PM' : 'AM';
        horas = horas % 12;
        horas = horas ? horas : 12;
        return `${horas}:${minutos} ${ampm}`;
    };

    // Cargar datos del barbero y citas
    useEffect(() => {
        const cargarPanelBarbero = async () => {
            const barberoLocal = JSON.parse(localStorage.getItem("usuario"));
            
            if (barberoLocal && barberoLocal.idUsuario) {
                try {
                    // Obtener datos del barbero
                    const resBarbero = await fetch(`http://localhost:8081/api/usuarios/${barberoLocal.idUsuario}`);
                    if (resBarbero.ok) {
                        const barberoFresco = await resBarbero.json();
                        setBarbero(barberoFresco);
                        // Actualizar almacenamiento local
                        localStorage.setItem("usuario", JSON.stringify(barberoFresco));
                    } else {
                        setBarbero(barberoLocal); // Plan B si falla
                    }

                    // Obtener citas del barbero
                    const resCitas = await fetch(`http://localhost:8081/api/reservas/barbero/${barberoLocal.idUsuario}`);
                    if (resCitas.ok) {
                        const todas = await resCitas.json();
                        // Encontrar primera cita pendiente
                        const pendientes = todas.filter(r => r.estado === 'PENDIENTE');
                        if (pendientes.length > 0) {
                            setProximaCita(pendientes[0]);
                        }
                    }
                } catch (error) {
                    console.error("Error sincronizando panel de barbero:", error);
                }
            }
        };

        cargarPanelBarbero();
    }, []);

    // Cerrar sesión del barbero
    const cerrarSesion = () => {
        localStorage.removeItem("usuario");
        navigate('/login');
    };

    return (
        <main className="pagina-fondo-gris">
            <div className="container-dashboard">
                
                {/* Menú lateral */}
                <div className="sidebar-perfil sidebar-barbero">
                    <div className="info-usuario">
                        {/* Foto de perfil */}
                        <img src={obtenerImagen(barbero.foto)} alt="Foto de perfil" className="foto-circular" />
                        <h2>Hola, {barbero.nombre}</h2>
                    </div>
                    
                    <nav className="menu-lateral">
                        <Link to="/perfil-barbero"><button className="btn-menu">Mi Perfil</button></Link>
                        <Link to="/mis-servicios-barbero"><button className="btn-menu">Mis Servicios</button></Link>
                        <Link to="/crear-servicio"><button className="btn-menu">Crear Servicio</button></Link>
                        <button className="btn-menu">Mi Disponibilidad</button>
                        <button className="btn-menu">Notificaciones</button>
                        <button className="btn-menu btn-salir" onClick={cerrarSesion}>Cerrar Sesión</button>
                    </nav>
                </div>

                {/* Contenido principal */}
                <div className="contenido-dashboard">
                    <h1 className="titulo-dashboard-barbero">Citas de hoy</h1>

                    <div className="grid-stats-barbero">
                        {/* Mostrar próxima cita o mensaje si no hay */}
                        {proximaCita ? (
                            <div className="tarjeta-stat destacada">
                                <h3>Próxima cita</h3>
                                <p className="texto-resaltado">{proximaCita.fecha} a las {formatearHora(proximaCita.hora)}</p>
                                <p><strong>Cliente:</strong> {proximaCita.cliente?.nombre} {proximaCita.cliente?.apellido}</p>
                                <p><strong>Tipo de servicio:</strong> {proximaCita.servicio?.nombre}</p>
                            </div>
                        ) : (
                            <div className="tarjeta-stat destacada" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3>Próxima cita</h3>
                                <p className="texto-resaltado" style={{ color: '#666' }}>No hay citas pendientes</p>
                                <p>¡Tienes tiempo libre!</p>
                            </div>
                        )}

                        {/* Estadísticas del día */}
                        <div className="tarjeta-stat centrado">
                            <h2 className="numero-gigante">5</h2>
                            <p className="texto-stat">Servicios completados hoy</p>
                        </div>
                        <div className="tarjeta-stat centrado">
                            <h2 className="numero-gigante">$120.000</h2>
                            <p className="texto-stat">Ingresos del día</p>
                        </div>
                        <div className="tarjeta-stat centrado">
                            <h2 className="numero-gigante">4.6</h2>
                            <p className="texto-stat">Calificación promedio</p>
                        </div>
                    </div>

                    {/* Detalle de cita en curso */}
                    {proximaCita && (
                        <div className="tarjeta-stat extendida mt-20">
                            <h3>Detalle de cita en curso</h3>
                            <p className="texto-resaltado">{proximaCita.fecha} a las {formatearHora(proximaCita.hora)}</p>
                            <p><strong>Cliente:</strong> {proximaCita.cliente?.nombre} {proximaCita.cliente?.apellido}</p>
                            <p><strong>Tipo de servicio:</strong> {proximaCita.servicio?.nombre}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default DashboardBarbero;