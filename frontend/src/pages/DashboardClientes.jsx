import React from 'react';
import { Link } from 'react-router-dom';
import fotoperfil from '../assets/img/foto-perfil.png';

const DashboardCliente = () => {
    return (
        <div className="container-dashboard">
            
            {/* --- SECCIÓN 1: MENÚ LATERAL (SIDEBAR) --- */}
            <div className="sidebar-perfil">
                <div className="info-usuario">
                    {/* Nota: En React las etiquetas img deben autocerrarse con /> */}
                    <img src={fotoperfil} alt="Foto de perfil" className="foto-circular" />
                    <h3>Camilo Perez</h3>
                    <p>Cliente VIP</p>
                </div>
                
                {/* Navegación interna del dashboard */}
                <nav className="menu-lateral">
                    <Link to="/perfil-cliente">
                        <button className="btn-menu btn-perfil activo">Mi Perfil</button>
                    </Link>
                    <Link to="/mis-reservas">
                        <button className="btn-menu btn-reservas">Mis Reservas</button>
                    </Link>
                    <Link to="/fidelizacion">
                        <button className="btn-menu btn-fidelizacion">Fidelizacion (Puntos)</button>
                    </Link>
                    <Link to="/editar-perfil">
                        <button className="btn-menu btn-editar-perfil">Editar Perfil</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn-menu btn-cerrar-sesion">Cerrar Sesión</button>
                    </Link>
                </nav>
            </div>

            {/* --- SECCIÓN 2: CONTENIDO PRINCIPAL --- */}
            <div className="contenido-dashboard">
                <section className="texto texto-izq">
                    <h2>Bienvenido a tu panel</h2>
                    <p>Aqui puedes gestionar tus citas y revisar tus beneficios exclusivos.</p>
                </section>

                <div className="tarjetas-resumen">
                    
                    {/* TARJETA A: PRÓXIMA CITA */}
                    <div className="tarjeta-dash">
                        <div className="cabecera-tarjeta">
                            <h3>Proxima Cita</h3>
                        </div>
                        <div className="detalle-cita">
                            <p><strong>Servicio:</strong> Corte Premium + Arreglo de Barba</p>
                            <p><strong>Fecha:</strong> 28 de Febrero, 2026</p>
                            <p><strong>Hora:</strong> 4:30 PM</p>
                            <p><strong>Barbero:</strong> Miguel</p>
                        </div>
                        <div className="boton">
                            {/* Nota: En React los estilos en línea se escriben como objetos con doble llave {{ }} */}
                            <button id="boton-reservar" style={{ width: '100%' }}>Modificar Cita</button>
                        </div>
                    </div>

                    {/* TARJETA B: PUNTOS DE FIDELIZACIÓN */}
                    <div className="tarjeta-dash tarjeta-centrada">
                        <div className="cabecera-tarjeta">
                            <h3>Mis Puntos Madhouse</h3>
                        </div>
                        <div className="puntos-info">
                            <h2 className="numero-puntos">1,250</h2>
                            <p>Puntos Acumulados</p>
                        </div>
                        <div className="boton">
                            {/* Nota: En CSS en línea de React, propiedades como margin-top pasan a ser marginTop (camelCase) */}
                            <button id="boton-horarios" style={{ width: '100%', margin: '0', marginTop: '15px' }}>Canjear Premios</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardCliente;