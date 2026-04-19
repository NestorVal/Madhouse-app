import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MisServiciosBarbero = () => {
    // --- 1. ESTADOS ---
    const [pestañaActiva, setPestañaActiva] = useState('proximas');
    const [reservas, setReservas] = useState([]); // Aquí guardaremos las citas que lleguen del backend

    // --- 2. CARGA DE DATOS (GET) ---
    useEffect(() => {
        cargarCitas();
    }, []);

    const cargarCitas = async () => {
        const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
        
        if (!usuarioLocal || !usuarioLocal.idUsuario) return;

        try {
            // Hacemos la petición al backend pidiendo solo las reservas de ESTE barbero
            const respuesta = await fetch(`http://localhost:8081/api/reservas/barbero/${usuarioLocal.idUsuario}`);
            
            if (respuesta.ok) {
                const datos = await respuesta.json();
                setReservas(datos);
            }
        } catch (error) {
            console.error("Error cargando las citas:", error);
        }
    };

    // --- 3. LÓGICA DE ACTUALIZACIÓN DE ESTADO (PUT) ---
    const marcarComoCompletada = async (idReserva) => {
        try {
            // Endpoint imaginado para cambiar el estado de la cita
            const respuesta = await fetch(`http://localhost:8081/api/reservas/estado/${idReserva}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: 'COMPLETADA' })
            });

            if (respuesta.ok) {
                Swal.fire({
                    title: '¡Excelente!',
                    text: 'El servicio ha sido marcado como completado.',
                    icon: 'success',
                    confirmButtonColor: '#C69C3B'
                });
                // Recargamos la lista para que la cita pase automáticamente a la pestaña "Historial"
                cargarCitas(); 
            } else {
                Swal.fire('Error', 'No se pudo actualizar el estado de la reserva.', 'error');
            }
        } catch (error) {
            Swal.fire('Error de conexión', 'No se pudo contactar al servidor.', 'error');
        }
    };

    // --- 4. FILTROS (Separar próximas del historial) ---
    // Asumimos que tu base de datos tiene un campo 'estado' (PENDIENTE, COMPLETADA, CANCELADA)
    const proximasCitas = reservas.filter(reserva => reserva.estado === 'PENDIENTE' || reserva.estado === 'CONFIRMADA');
    const historialCitas = reservas.filter(reserva => reserva.estado === 'COMPLETADA' || reserva.estado === 'CANCELADA');

    // --- 5. RENDERIZADO VISUAL ---
    return (
        <main className="pagina-fondo-gris">
            <div className="container-general">
                <Link to="/dashboard-barbero" className="link-volver">← Volver al dashboard</Link>
                
                <h1 className="titulo-seccion texto-centro mt-20" style={{fontSize: '48px', color: '#121212'}}>MIS SERVICIOS</h1>

                {/* TABS (PESTAÑAS) */}
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

                {/* CONTENIDO DE PESTAÑA: PRÓXIMAS */}
                {pestañaActiva === 'proximas' && (
                    <div className="lista-reservas">
                        {proximasCitas.length > 0 ? (
                            proximasCitas.map((reserva) => (
                                <div key={reserva.idReserva} className="tarjeta-reserva tarjeta-servicio-barbero">
                                    <div className="check-circular">☑</div>
                                    <div className="reserva-info">
                                        <h3>{reserva.fecha} - {reserva.hora}</h3>
                                        {/* Mostramos el servicio y el nombre del cliente asociados a esta reserva */}
                                        <p className="servicio-destacado">{reserva.servicio?.nombre || "Corte de pelo"}</p>
                                        <p className="cliente-destacado">{reserva.cliente?.nombre} {reserva.cliente?.apellido}</p>
                                    </div>
                                    <div className="reserva-acciones-derecha">
                                        <span className="badge-estado badge-gris-claro">{reserva.estado}</span>
                                        <button 
                                            className="btn-tarjeta-oscuro mt-10"
                                            onClick={() => marcarComoCompletada(reserva.idReserva)}
                                        >
                                            Marcar como completado
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="texto-centro" style={{padding: '50px'}}>
                                <p>No tienes citas programadas próximamente.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* CONTENIDO DE PESTAÑA: HISTORIAL */}
                {pestañaActiva === 'historial' && (
                    <div className="lista-reservas">
                        {historialCitas.length > 0 ? (
                            historialCitas.map((reserva) => (
                                <div key={reserva.idReserva} className="tarjeta-reserva tarjeta-servicio-barbero" style={{ opacity: 0.7 }}>
                                    <div className="check-circular" style={{ backgroundColor: '#ccc', borderColor: '#ccc' }}>✓</div>
                                    <div className="reserva-info">
                                        <h3>{reserva.fecha} - {reserva.hora}</h3>
                                        <p className="servicio-destacado">{reserva.servicio?.nombre || "Corte de pelo"}</p>
                                        <p className="cliente-destacado">{reserva.cliente?.nombre} {reserva.cliente?.apellido}</p>
                                    </div>
                                    <div className="reserva-acciones-derecha">
                                        <span 
                                            className="badge-estado"  
                                            style={{
                                                // Operador ternario: Si es COMPLETADA pinta verde, de lo contrario (CANCELADA) pinta rojo
                                                backgroundColor: reserva.estado === 'COMPLETADA' ? '#28a745' : '#dc3545',
                                                color: 'white',
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontWeight: 'bold',
                                                fontSize: '12px',
                                                letterSpacing: '1px'
                                            }}>
                                                {reserva.estado}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="texto-centro" style={{padding: '50px'}}>
                                <p>No hay servicios en el historial.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MisServiciosBarbero; 