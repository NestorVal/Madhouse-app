// --- IMPORTACIONES ---
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MisReservas = () => {
    // --- ESTADO (MEMORIA) ---
    // 'pestañaActiva' guarda un texto. Empieza con la palabra 'proximas'.
    const [pestañaActiva, setPestañaActiva] = useState('proximas');

    // --- RENDERIZADO VISUAL ---
    return (
        <main className="pagina-fondo-gris">
            <div className="container-general">
                <Link to="/dashboard-cliente" className="link-volver">← Volver al dashboard</Link>
                <h1 className="titulo-seccion texto-centro mt-20">MIS RESERVAS</h1>

                {/* --- CONTROLES DE PESTAÑAS --- */}
                <div className="tabs-container">
                    <button 
                        /* Lógica CSS Dinámico: Si pestañaActiva es 'proximas', agrégale la clase 'activo'. Si no, déjalo vacío '' */
                        className={`tab-boton ${pestañaActiva === 'proximas' ? 'activo' : ''}`}
                        /* Al hacer clic, actualiza la memoria a 'proximas' */
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

                {/* --- RENDERIZADO CONDICIONAL LÓGICO (&&) --- */}
                
                {/* Si la pestaña activa es 'proximas', DIBUJA ESTE BLOQUE */}
                {pestañaActiva === 'proximas' && (
                    <div className="lista-reservas">
                        {/* Tarjeta de reserva próxima... */}
                    </div>
                )}

                {/* Si la pestaña activa es 'historial', DIBUJA ESTE BLOQUE DISTINTO */}
                {pestañaActiva === 'historial' && (
                    <div className="lista-reservas">
                        <div className="tarjeta-reserva">
                            <div className="reserva-info">
                                <p><strong>Fecha:</strong> Miércoles, 1 de Mayo, 1:00 pm</p>
                                <p><strong>Servicio:</strong> Corte de pelo</p>
                                <p><strong>Barbero:</strong> Alexander Ramos</p>
                                <p><strong>Precio:</strong> $20.000</p>
                                <span className="badge-estado badge-verde">Próximo</span>
                            </div>
                            <div className="reserva-acciones">
                                <button className="btn-tarjeta-oscuro">Dejar Reseña</button>
                                <button className="btn-tarjeta-oscuro">Ver Reseña</button>
                                <button className="btn-tarjeta-oscuro">Cancelar Reserva</button>
                                <Link to="/"><button className="btn-tarjeta-blanco">Volver al inicio</button></Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Renderizado Condicional: Pestaña Historial */}
                {pestañaActiva === 'historial' && (
                    <div className="lista-reservas">
                        {/* Tarjeta Completada */}
                        <div className="tarjeta-reserva">
                            <div className="reserva-info">
                                <p><strong>Fecha:</strong> Miércoles, 1 de Mayo, 1:00 pm</p>
                                <p><strong>Servicio:</strong> Corte de pelo</p>
                                <p><strong>Barbero:</strong> Alexander Ramos</p>
                                <p><strong>Precio:</strong> $20.000</p>
                                <span className="badge-estado badge-verde">Completado</span>
                            </div>
                            <div className="reserva-acciones">
                                <button className="btn-tarjeta-oscuro">Dejar Reseña</button>
                                <button className="btn-tarjeta-oscuro">Ver Reseña</button>
                                <Link to="/"><button className="btn-tarjeta-blanco">Volver al inicio</button></Link>
                            </div>
                        </div>

                        {/* Tarjeta Cancelada */}
                        <div className="tarjeta-reserva">
                            <div className="reserva-info">
                                <p><strong>Fecha:</strong> Lunes, 25 de Abril, 3:30 pm</p>
                                <p><strong>Servicio:</strong> Corte + Barba</p>
                                <p><strong>Barbero:</strong> Carlos Mendoza</p>
                                <p><strong>Precio:</strong> $35.000</p>
                                <span className="badge-estado badge-gris">Cancelado</span>
                            </div>
                            <div className="reserva-acciones">
                                <button className="btn-tarjeta-oscuro">Ver Reseña</button>
                                <Link to="/"><button className="btn-tarjeta-blanco">Volver al inicio</button></Link>
                            </div>
                        </div>

                        {/* Tarjeta No Asistió */}
                        <div className="tarjeta-reserva">
                            <div className="reserva-info">
                                <p><strong>Fecha:</strong> Viernes, 15 de Abril, 11:00 am</p>
                                <p><strong>Servicio:</strong> Afeitado clásico</p>
                                <p><strong>Barbero:</strong> Miguel Torres</p>
                                <p><strong>Precio:</strong> $25.000</p>
                                <span className="badge-estado badge-azul">No Asistió</span>
                            </div>
                            <div className="reserva-acciones">
                                <button className="btn-tarjeta-oscuro">Ver Reseña</button>
                                <Link to="/"><button className="btn-tarjeta-blanco">Volver al inicio</button></Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MisReservas;