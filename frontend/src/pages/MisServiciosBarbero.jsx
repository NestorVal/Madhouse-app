import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MisServiciosBarbero = () => {
    const [pestañaActiva, setPestañaActiva] = useState('proximas');

    return (
        <main className="pagina-fondo-gris">
            <div className="container-general">
                <Link to="/dashboard-barbero" className="link-volver">← Volver al dashboard</Link>
                
                <h1 className="titulo-seccion texto-centro mt-20" style={{fontSize: '48px', color: '#121212'}}>MIS SERVICIOS</h1>

                <div className="tabs-container">
                    <button 
                        className={`tab-boton ${pestañaActiva === 'proximas' ? 'activo' : ''}`}
                        onClick={() => setPestañaActiva('proximas')}
                    >
                        PRÓXIMAS
                    </button>
                    <button 
                        className={`tab-boton ${pestañaActiva === 'historial' ? 'activo' : ''}`}
                        onClick={() => setPestañaActiva('historial')}
                    >
                        HISTORIAL
                    </button>
                </div>

                {pestañaActiva === 'proximas' && (
                    <div className="lista-reservas">
                        {/* Tarjeta Servicio Barbero */}
                        <div className="tarjeta-reserva tarjeta-servicio-barbero">
                            <div className="check-circular">☑</div>
                            <div className="reserva-info">
                                <h3>Miercoles, 1 de Mayo, 1:00 pm</h3>
                                <p className="servicio-destacado">Corte de pelo</p>
                                <p className="cliente-destacado">Camilo Perez</p>
                            </div>
                            <div className="reserva-acciones-derecha">
                                <span className="badge-estado badge-gris-claro">Confirmada</span>
                                <button className="btn-tarjeta-oscuro mt-10">Marcar como completado</button>
                            </div>
                        </div>

                        <div className="tarjeta-reserva tarjeta-servicio-barbero">
                            <div className="check-circular">☑</div>
                            <div className="reserva-info">
                                <h3>Miercoles, 1 de Mayo, 1:00 pm</h3>
                                <p className="servicio-destacado">Corte de pelo</p>
                                <p className="cliente-destacado">Andres Loaiza</p>
                            </div>
                            <div className="reserva-acciones-derecha">
                                <span className="badge-estado badge-gris-claro">Confirmada</span>
                                <button className="btn-tarjeta-oscuro mt-10">Marcar como completado</button>
                            </div>
                        </div>

                        <div className="tarjeta-reserva tarjeta-servicio-barbero">
                            <div className="check-circular">☑</div>
                            <div className="reserva-info">
                                <h3>Miercoles, 1 de Mayo, 1:00 pm</h3>
                                <p className="servicio-destacado">Corte de pelo</p>
                                <p className="cliente-destacado">Juan Diaz</p>
                            </div>
                            <div className="reserva-acciones-derecha">
                                <span className="badge-estado badge-gris-claro">Confirmada</span>
                                <button className="btn-tarjeta-oscuro mt-10">Marcar como completado</button>
                            </div>
                        </div>
                    </div>
                )}

                {pestañaActiva === 'historial' && (
                    <div className="lista-reservas texto-centro">
                        <p style={{padding: '50px'}}>No hay servicios en el historial.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MisServiciosBarbero;