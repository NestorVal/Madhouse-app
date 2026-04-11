

// --- 1. IMPORTACIONES ---
import React from 'react';
import { Link } from 'react-router-dom'; // Crucial para los botones del menú lateral
import barbero5 from '../assets/img/barbero5.png';

const DashboardBarbero = () => {
    // Este componente no tiene 'useState' porque actualmente solo dibuja información estática.
    // Más adelante, aquí haremos las peticiones a la base de datos para llenar las tarjetas.

    // --- 2. RENDERIZADO VISUAL ---
    return (
        <main className="pagina-fondo-gris">
            <div className="container-dashboard">
                
                {/* SECCIÓN A: MENÚ LATERAL */}
                <div className="sidebar-perfil sidebar-barbero">
                    <div className="info-usuario">
                        {/* Renderizado de la imagen importada */}
                        <img src={barbero5} alt="Foto de perfil" className="foto-circular" />
                        <h2>Hola, Alexander</h2>
                    </div>
                    {/* Navegación mediante Links de React Router */}
                    <nav className="menu-lateral">
                        <Link to="/perfil-barbero"><button className="btn-menu">Mi Perfil</button></Link>
                        <Link to="/mis-servicios-barbero"><button className="btn-menu">Mis Servicios</button></Link>
                        <button className="btn-menu">Mi Disponibilidad</button>
                        <button className="btn-menu">Notificaciones</button>
                        <Link to="/login"><button className="btn-menu btn-salir">Cerrar Sesión</button></Link>
                    </nav>
                </div>

                {/* SECCIÓN B: CONTENIDO CENTRAL */}
                <div className="contenido-dashboard">
                    <h1 className="titulo-dashboard-barbero">Citas de hoy</h1>

                    {/* Tarjetas de estadísticas (UI Estática) */}
                    <div className="grid-stats-barbero">
                        <div className="tarjeta-stat destacada">
                            <h3>Próxima cita</h3>
                            <p className="texto-resaltado">Lunes 20 de Mayo a las 5:25 pm</p>
                            <p><strong>Cliente:</strong> Camilo Perez</p>
                            <p><strong>Tipo de servicio:</strong> Corte</p>
                        </div>
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

                    {/* Tarjeta de Próxima cita detallada inferior */}
                    <div className="tarjeta-stat extendida mt-20">
                        <h3>Próxima cita</h3>
                        <p className="texto-resaltado">Lunes 20 de Mayo a las 5:25 pm</p>
                        <p><strong>Cliente:</strong> Camilo Perez</p>
                        <p><strong>Tipo de servicio:</strong> Corte</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardBarbero;