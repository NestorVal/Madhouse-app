import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


const MisReservas = () => {
    // --- MEMORIA DEL COMPONENTE (ESTADO) ---
    
    // 'pestañaActiva': Controla qué lista se muestra (PRÓXIMAS o HISTORIAL).
    const [pestañaActiva, setPestañaActiva] = useState('proximas');
    
    // 'reservas': Arreglo que guardará la lista completa que nos entregue MySQL.
    const [reservas, setReservas] = useState([]);

    // --- 3. CARGA DE DATOS (GET) ---
    // Cargar reservas al iniciar
    useEffect(() => {
        cargarReservas();
    }, []);

    const cargarReservas = async () => {
            // Obtener ID del cliente del almacenamiento local
            const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
            
            if (!usuarioLocal || !usuarioLocal.idUsuario) return;

            try {
                // Hacemos la petición al endpoint de cliente que definimos en Spring Boot.
                const respuesta = await fetch(`http://localhost:8081/api/reservas/cliente/${usuarioLocal.idUsuario}`);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setReservas(datos);
                } else {
                    console.error("Error al obtener las reservas del servidor.");
                }
            } catch (error) {
                console.error("Error de conexión con la base de datos:", error);
            }
        };

    // --- TRADUCTOR DE HORA (24h a 12h AM/PM) ---
    // Esta función asegura que el cliente lea "3:30 PM" en lugar de "15:30:00".
    const formatearHora = (hora24) => {
        if (!hora24) return "";
        const partes = hora24.split(':');
        let horas = parseInt(partes[0], 10);
        const minutos = partes[1];
        const ampm = horas >= 12 ? 'PM' : 'AM';
        
        horas = horas % 12;
        horas = horas ? horas : 12; // Si es 0 (medianoche), mostrar 12.
        
        return `${horas}:${minutos} ${ampm}`;
    };

    // Función para cancelar la cita desde el dashboard
    const cancelarCita = async (idReserva) => {
        // Usamos SweetAlert para confirmar antes de actuar
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
                    // Recargamos la cita para que el dashboard se actualice y muestre el estado de "no hay citas"
                    cargarReservas();
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
            }
        }
    };

    // --- LÓGICA DE FILTRADO ---
    // Dividimos la lista maestra en dos arreglos dinámicos según el estado de la reserva.
    const reservasProximas = reservas.filter(r => r.estado === 'PENDIENTE' || r.estado === 'CONFIRMADA');
    const reservasHistorial = reservas.filter(r => r.estado === 'COMPLETADA' || r.estado === 'CANCELADA');

    // --- ESTRUCTURA VISUAL  ---
    return (
        <main className="pagina-fondo-gris">
            <div className="container-general">
                {/* Botón de retorno al dashboard */}
                <Link to="/dashboard-cliente" className="link-volver">← Volver al dashboard</Link>
                
                <h1 className="titulo-seccion texto-centro mt-20" style={{fontSize: '48px', color: '#121212'}}>MIS RESERVAS</h1>

                {/* Tabs para próximas y historial */}
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

                {/* CONTENIDO PESTAÑA: PRÓXIMAS */}
                {pestañaActiva === 'proximas' && (
                    <div className="lista-reservas">
                        {reservasProximas.length > 0 ? (
                            reservasProximas.map((reserva) => (
                                <div key={reserva.idReserva} className="tarjeta-reserva">
                                    <div className="reserva-info">
                                        <h3>{reserva.fecha} - {formatearHora(reserva.hora)}</h3>
                                        <p className="servicio-destacado">{reserva.servicio?.nombre || "Corte de pelo"}</p>
                                        <p className="barbero-destacado">Barbero: {reserva.barbero?.nombre} {reserva.barbero?.apellido}</p>
                                    </div>
                                    <div className="reserva-acciones-derecha">
                                        {/* Badge que indica el estado actual en la BD */}
                                        <span className="badge-estado badge-gris-claro">{reserva.estado}</span>
                                        <button 
                                            className="btn-cancelar-mini mt-10"
                                            style={{ 
                                            display: 'block', 
                                            backgroundColor: 'transparent', 
                                            color: '#d33', 
                                            border: '1px solid #d33',
                                            fontSize: '12px',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
            // Le pasamos el ID exacto de la cita que se está dibujando en este momento
            onClick={() => cancelarCita(reserva.idReserva)}
        >
            Cancelar Cita
        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Mensaje si no hay citas agendadas
                            <div className="texto-centro" style={{padding: '50px'}}>
                                <p>No tienes reservas programadas próximamente.</p>
                                <Link to="/reservas">
                                    <button className="btn-tarjeta-oscuro mt-20">Agendar una cita</button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* CONTENIDO PESTAÑA: HISTORIAL */}
                {pestañaActiva === 'historial' && (
                    <div className="lista-reservas">
                        {reservasHistorial.length > 0 ? (
                            reservasHistorial.map((reserva) => (
                                <div key={reserva.idReserva} className="tarjeta-reserva" style={{ opacity: 0.7 }}>
                                    <div className="reserva-info">
                                        <h3>{reserva.fecha} - {formatearHora(reserva.hora)}</h3>
                                        <p className="servicio-destacado">{reserva.servicio?.nombre || "Corte de pelo"}</p>
                                        <p className="barbero-destacado">Barbero: {reserva.barbero?.nombre} {reserva.barbero?.apellido}</p>
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
                                            }}
                                        >
                                            {reserva.estado}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="texto-centro" style={{padding: '50px'}}>
                                <p>Tu historial de citas está vacío.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MisReservas; 