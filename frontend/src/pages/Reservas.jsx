// Componente de reservas: 4 pasos (servicio, barbero, fecha/hora, pago)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Reservas = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const servicioDesdeHome = location.state?.servicio;

    // Estados: paso actual, servicios, barberos y datos de la reserva
    const [pasoActual, setPasoActual] = useState(servicioDesdeHome ? 2 : 1);
    const [serviciosBD, setServiciosBD] = useState([]);
    const [barberosBD, setBarberosBD] = useState([]);
    
    // Guardar selecciones del usuario en cada paso (servicio, barbero, fecha, hora, pago)
    const [datosReserva, setDatosReserva] = useState({
        servicio: servicioDesdeHome || null, 
        precio: servicioDesdeHome?.precio || 0,
        barbero: null, 
        fecha: '',
        hora: '',
        metodoPago: ''
    });

    // Cargar servicios y barberos desde la base de datos
    useEffect(() => {
        const cargarCatalogos = async () => {
            try {
                // Peticiones paralelas para cargar servicios y usuarios
                const resServicios = await fetch('http://localhost:8081/api/servicios');
                const resUsuarios = await fetch('http://localhost:8081/api/usuarios');

                if (resServicios.ok && resUsuarios.ok) {
                    const dataServicios = await resServicios.json();
                    const dataUsuarios = await resUsuarios.json();
                    
                    setServiciosBD(dataServicios);
                    // Filtrar solo usuarios con rol de barbero
                    setBarberosBD(dataUsuarios.filter(u => u.rol === 'ROLE_BARBERO'));
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        cargarCatalogos();
    }, []);

    // Avanzar al siguiente paso
    const siguientePaso = (e) => {
        e.preventDefault();
        setPasoActual(pasoActual + 1);
    };

    // Retroceder al paso anterior
    const pasoAnterior = (e) => {
        e.preventDefault();
        setPasoActual(pasoActual - 1);
    };

    // Actualizar un dato de la reserva (mantiene los anteriores)
    const seleccionarDato = (campo, valor, precioExtra = 0) => {
        setDatosReserva({ 
            ...datosReserva, 
            [campo]: valor,
            ...(precioExtra > 0 && { precio: precioExtra })
        });
    };

    // Confirmar y enviar reserva al backend
    const confirmarReserva = async (e) => {
        e.preventDefault();
        
        // Obtener datos del usuario desde localStorage
        const clienteLocal = JSON.parse(localStorage.getItem("usuario"));

        // Convertir hora de AM/PM a formato 24 horas
        let horaMilitar = "00:00";
        
        if (datosReserva.hora) {
            // Separar hora de periodo (AM/PM)
            const [horaMinutos, periodo] = datosReserva.hora.split(' ');
            // Separar horas y minutos
            let [horas, minutos] = horaMinutos.split(':');
            
            horas = parseInt(horas);
            
            if (periodo === 'PM' && horas !== 12) {
                horas += 12;
            } else if (periodo === 'AM' && horas === 12) {
                horas = 0;
            }
            
            // Formatear para el backend (HH:MM)
            horaMilitar = `${horas.toString().padStart(2, '0')}:${minutos}`;
        }
        
        // Empaquetar datos para enviar al backend
        const paqueteReserva = {
            reserva: {
                fecha: datosReserva.fecha,
                hora: horaMilitar,
                estado: "PENDIENTE",
                cliente: { idUsuario: clienteLocal.idUsuario },
                barbero: { idUsuario: datosReserva.barbero.idUsuario }
            },
            idServicios: [datosReserva.servicio.idServicio]
        };

        try {
            const respuesta = await fetch('http://localhost:8081/api/reservas/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paqueteReserva)
            });

            if (respuesta.ok) {
                Swal.fire({
                    title: '¡Reserva confirmada con éxito!',
                    text: 'Te esperamos en Madhouse.',
                    icon: 'success',
                    confirmButtonColor: '#C69C3B'
                }).then(() => {
                    navigate('/dashboard-cliente'); // Lo devolvemos al panel cuando le da OK
                });
            } else {
                Swal.fire('Error', 'No se pudo agendar la cita.', 'error');
            }
        } catch (error) {
            Swal.fire('Error de conexión', 'No hay comunicación con el servidor.', 'error');
        }
    };

    // Renderizado de los 4 pasos
    return (
        <div className="container-reserva">
            {/* Botón para volver al menú principal */}
            <Link to="/dashboard-cliente" className="link-volver">← Volver al Dashboard</Link>

            {/* Paso 1: seleccionar servicio */}
            {pasoActual === 1 && (
                <div id="paso-1" className="caja-formulario">
                    <section className="texto">
                        <h2>Reserva tu cita</h2>
                        <p>Paso 1: Selecciona el servicio</p>
                    </section>
                    
                    <div className="opciones-grid">
                        {/* Renderizar una tarjeta por cada servicio */}
                        {serviciosBD.map((srv) => (
                            <div 
                                key={srv.idServicio}
                                className={`opcion-tarjeta seleccionable ${datosReserva.servicio?.idServicio === srv.idServicio ? 'activo' : ''}`}
                                onClick={() => seleccionarDato('servicio', srv, srv.precio)}
                            >
                                <h3>{srv.nombre}</h3>
                                <p>{srv.duracion} min - ${srv.precio.toLocaleString('es-CO')}</p>
                            </div>
                        ))}
                    </div>

                    <div className="boton grupo-botones-derecha">
                        <button onClick={siguientePaso} disabled={!datosReserva.servicio} className="btn-formulario btn-sig">Siguiente</button>
                    </div>
                </div>
            )}

            {/* Paso 2: seleccionar barbero */}
            {pasoActual === 2 && (
                <div id="paso-2" className="caja-formulario">
                    <section className="texto">
                        <h2>Elige a tu barbero</h2>
                        <p>Paso 2: Selecciona el profesional</p>
                    </section>
                    
                    <div className="opciones-grid">
                        {/* Renderizar un barbero por cada usuario con rol barbero */}
                        {barberosBD.map((bar) => (
                            <div 
                                key={bar.idUsuario}
                                className={`opcion-tarjeta seleccionable ${datosReserva.barbero?.idUsuario === bar.idUsuario ? 'activo' : ''}`}
                                onClick={() => seleccionarDato('barbero', bar)}
                            >
                                <img src={bar.foto || "/assets/avatar-placeholder.png"} alt={bar.nombre} className="foto-barbero" />
                                <h3>{bar.nombre} {bar.apellido}</h3>
                                <p>{bar.especialidad || "Barbero Profesional"}</p>
                            </div>
                        ))}
                    </div>

                    <div className="boton grupo-botones">
                        <button onClick={pasoAnterior} className="btn-formulario btn-secundario">Atras</button>
                        <button onClick={siguientePaso} disabled={!datosReserva.barbero} className="btn-formulario btn-sig">Siguiente</button>
                    </div>
                </div>
            )}

            {/* Paso 3: seleccionar fecha y hora */}
            {pasoActual === 3 && (
                <div id="paso-3" className="caja-formulario">
                    <section className="texto">
                        <h2>Disponibilidad Horaria</h2>
                        <p>Paso 3: ¿Cuando nos visitas?</p>
                    </section>
                    
                    <div className="campos-formulario">
                        <label htmlFor="fecha-cita">Selecciona la Fecha:</label>
                        <input 
                            type="date" 
                            id="fecha-cita" 
                            value={datosReserva.fecha}
                            onChange={(e) => seleccionarDato('fecha', e.target.value)}
                        />

                        <label className="label-espaciado">Horas disponibles:</label>
                        <div className="opciones-grid">
                            <div 
                                className={`opcion-tarjeta seleccionable tarjeta-hora ${datosReserva.hora === '2:00 PM' ? 'activo' : ''}`}
                                onClick={() => seleccionarDato('hora', '2:00 PM')}
                            >2:00 PM</div>
                            <div 
                                className={`opcion-tarjeta seleccionable tarjeta-hora ${datosReserva.hora === '3:30 PM' ? 'activo' : ''}`}
                                onClick={() => seleccionarDato('hora', '3:30 PM')}
                            >3:30 PM</div>
                            <div 
                                className={`opcion-tarjeta seleccionable tarjeta-hora ${datosReserva.hora === '5:00 PM' ? 'activo' : ''}`}
                                onClick={() => seleccionarDato('hora', '5:00 PM')}
                            >5:00 PM</div>
                        </div>
                    </div>

                    <div className="boton grupo-botones">
                        <button onClick={pasoAnterior} className="btn-formulario btn-secundario">Atras</button>
                        <button onClick={siguientePaso} disabled={!datosReserva.fecha || !datosReserva.hora} className="btn-formulario btn-sig">Siguiente</button>
                    </div>
                </div>
            )}

            {/* Paso 4: seleccionar método de pago */}
            {pasoActual === 4 && (
                <div id="paso-4" className="caja-formulario">
                    <section className="texto">
                        <h2>Forma de Pago</h2>
                        <p>Paso 4: ¿Como deseas pagar?</p>
                    </section>
                    
                    <div className="opciones-grid">
                        <div 
                            className={`opcion-tarjeta seleccionable ${datosReserva.metodoPago === 'Efectivo' ? 'activo' : ''}`}
                            onClick={() => seleccionarDato('metodoPago', 'Efectivo')}
                        >
                            <h3>Efectivo</h3>
                            <p>En el local</p>
                        </div>
                        <div 
                            className={`opcion-tarjeta seleccionable ${datosReserva.metodoPago === 'Tarjeta' ? 'activo' : ''}`}
                            onClick={() => seleccionarDato('metodoPago', 'Tarjeta')}
                        >
                            <h3>Tarjeta</h3>
                            <p>Credito/Debito</p>
                        </div>
                        <div 
                            className={`opcion-tarjeta seleccionable ${datosReserva.metodoPago === 'App' ? 'activo' : ''}`}
                            onClick={() => seleccionarDato('metodoPago', 'App')}
                        >
                            <h3>App</h3>
                            <p>Nequi/Daviplata</p>
                        </div>
                    </div>

                    <div className="boton grupo-botones">
                        <button onClick={pasoAnterior} className="btn-formulario btn-secundario">Atras</button>
                        <button onClick={siguientePaso} disabled={!datosReserva.metodoPago} className="btn-formulario btn-sig">Ver Resumen</button>
                    </div>
                </div>
            )}

            {/* Paso 5: confirmar reserva */}
            {pasoActual === 5 && (
                <div id="paso-5" className="caja-formulario">
                    <section className="texto">
                        <h2>Confirmar Reserva</h2>
                        <p>Paso 5: Resumen de tu cita</p>
                    </section>
                    
                    <div className="resumen-cita">
                        <p><strong>Servicio:</strong> {datosReserva.servicio?.nombre}</p>
                        <p><strong>Barbero:</strong> {datosReserva.barbero?.nombre} {datosReserva.barbero?.apellido}</p>
                        <p><strong>Fecha:</strong> {datosReserva.fecha} - {datosReserva.hora}</p>
                        <p><strong>Pago:</strong> {datosReserva.metodoPago}</p>
                        <p className="total-resumen"><strong>Total: ${datosReserva.precio.toLocaleString('es-CO')}</strong></p>
                    </div>

                    <div className="boton grupo-botones">
                        <button onClick={pasoAnterior} className="btn-formulario btn-secundario">Atras</button>
                        <button onClick={confirmarReserva} className="btn-formulario">¡Confirmar Cita!</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Reservas;