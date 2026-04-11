// --- 1. IMPORTACIONES ---
// Importamos React y 'useState', que es el "hook" (herramienta) que nos permite darle memoria al componente.
import React, { useState } from 'react';
// Importamos 'Link' para poder navegar entre páginas sin que el navegador se recargue.
import { Link } from 'react-router-dom';

const Reservas = () => {
    // --- 2. MEMORIA DEL COMPONENTE (ESTADO) ---
    
    // 'pasoActual': Guarda un número (inicia en 1). Nos dirá en qué "pantalla" del proceso de reserva estamos.
    // 'setPasoActual': Es la función que usaremos para cambiar ese número (ej. pasar del 1 al 2).
    const [pasoActual, setPasoActual] = useState(1);
    
    // 'datosReserva': Es un OBJETO que funciona como un carrito de compras.
    // Va a guardar todas las decisiones que tome el usuario a lo largo de los 5 pasos.
    const [datosReserva, setDatosReserva] = useState({
        servicio: '',
        precio: 0,
        barbero: '',
        fecha: '',
        hora: '',
        metodoPago: ''
    });

    // --- 3. FUNCIONES DE ACCIÓN LÓGICA ---
    
    const siguientePaso = (e) => {
        // e.preventDefault(): Previene el comportamiento por defecto de los botones dentro de formularios,
        // evitando que la página se recargue o parpadee al hacer clic.
        e.preventDefault();
        // Tomamos el paso actual y le sumamos 1 para avanzar a la siguiente pantalla.
        setPasoActual(pasoActual + 1);
    };

    const pasoAnterior = (e) => {
        e.preventDefault();
        // Tomamos el paso actual y le restamos 1 para retroceder, sin perder los datos ya guardados.
        setPasoActual(pasoActual - 1);
    };

    // Función "maestra" que actualiza nuestro objeto 'datosReserva'
    const seleccionarDato = (campo, valor, precioExtra = 0) => {
        setDatosReserva({ 
            // ...datosReserva (Spread Operator): Hace una copia exacta de todo lo que ya habíamos guardado
            // para no borrar las selecciones de pasos anteriores.
            ...datosReserva, 
            
            // [campo]: valor -> Usamos corchetes para decirle a React que 'campo' es una variable dinámica.
            // Si le mandamos 'servicio', actualizará el servicio. Si le mandamos 'barbero', actualizará el barbero.
            [campo]: valor,
            
            // Lógica condicional avanzada: Si nos enviaron un 'precioExtra' mayor a 0, actualiza también el precio.
            ...(precioExtra > 0 && { precio: precioExtra }) // Actualiza el precio si se envía
        });
    };

    const confirmarReserva = (e) => {
        e.preventDefault();
        // Imprimimos en consola los datos finales que luego enviaremos al backend.
        console.log("Enviando reserva a la base de datos:", datosReserva);
        // Alerta nativa del navegador (más adelante aquí podrías poner tu Swal.fire)
        alert("¡Reserva confirmada con éxito!");
    };

    // --- 4. ESTRUCTURA VISUAL (RENDERIZADO) ---
    return (
        <div className="container-reserva">
            {/* Botón para volver al menú principal */}
            <Link to="/dashboard-cliente" className="link-volver">← Volver al Dashboard</Link>

            {/* --- PASO 1: SERVICIO --- */}
            {/* Renderizado Condicional (&&): Dibuja este bloque SÓLO SI el pasoActual es exactamente igual a 1 */}
            {pasoActual === 1 && (
                <div id="paso-1" className="caja-formulario">
                    <section className="texto">
                        <h2>Reserva tu cita</h2>
                        <p>Paso 1: Selecciona el servicio</p>
                    </section>
                    
                    <div className="opciones-grid">
                        <div 
                            // CSS Dinámico (Template Literals con ``): 
                            // Si en memoria el servicio es 'Corte Premium', le agregamos la clase 'activo' (para que se pinte de dorado).
                            className={`opcion-tarjeta seleccionable ${datosReserva.servicio === 'Corte Premium' ? 'activo' : ''}`}
                            // onClick: Ejecuta una función anónima ()=> que llama a nuestra función maestra con los datos correspondientes.
                            onClick={() => seleccionarDato('servicio', 'Corte Premium', 25000)}
                        >
                            <h3>Corte Premium</h3>
                            <p>45 min - $25.000</p>
                        </div>
                        <div 
                            className={`opcion-tarjeta seleccionable ${datosReserva.servicio === 'Arreglo de Barba' ? 'activo' : ''}`}
                            onClick={() => seleccionarDato('servicio', 'Arreglo de Barba', 15000)}
                        >
                            <h3>Arreglo de Barba</h3>
                            <p>30 min - $15.000</p>
                        </div>
                        <div 
                            className={`opcion-tarjeta seleccionable ${datosReserva.servicio === 'Corte + Barba' ? 'activo' : ''}`}
                            onClick={() => seleccionarDato('servicio', 'Corte + Barba', 35000)}
                        >
                            <h3>Corte + Barba</h3>
                            <p>1 hora - $35.000</p>
                        </div>
                    </div>

                    <div className="boton grupo-botones-derecha">
                        {/* El botón se deshabilita si no ha elegido servicio (disabled={!datosReserva.servicio}) 
                            Esto es una validación de seguridad para que el usuario no pueda avanzar en blanco. */}
                        <button onClick={siguientePaso} disabled={!datosReserva.servicio} className="btn-formulario btn-sig">Siguiente</button>
                    </div>
                </div>
            )}

            {/* --- PASO 2: BARBERO --- */}
            {/* Se muestra SOLO si el paso actual es 2 */}
            {pasoActual === 2 && (
                <div id="paso-2" className="caja-formulario">
                    <section className="texto">
                        <h2>Elige a tu barbero</h2>
                        <p>Paso 2: Selecciona el profesional</p>
                    </section>
                    
                    <div className="opciones-grid">
                        <div 
                            className={`opcion-tarjeta seleccionable ${datosReserva.barbero === 'Miguel' ? 'activo' : ''}`}
                            onClick={() => seleccionarDato('barbero', 'Miguel')}
                        >
                            <img src="/img/barbero1.png" alt="Miguel" className="foto-barbero" />
                            <h3>Miguel</h3>
                            <p>Especialista clasico</p>
                        </div>
                        <div 
                            className={`opcion-tarjeta seleccionable ${datosReserva.barbero === 'Andres' ? 'activo' : ''}`}
                            onClick={() => seleccionarDato('barbero', 'Andres')}
                        >
                            <img src="/img/barbero2.png" alt="Andres" className="foto-barbero" />
                            <h3>Andres</h3>
                            <p>Estilos modernos</p>
                        </div>
                    </div>

                    <div className="boton grupo-botones">
                        <button onClick={pasoAnterior} className="btn-formulario btn-secundario">Atras</button>
                        {/* Validación: No avanza si no hay un barbero seleccionado en memoria */}
                        <button onClick={siguientePaso} disabled={!datosReserva.barbero} className="btn-formulario btn-sig">Siguiente</button>
                    </div>
                </div>
            )}

            {/* --- PASO 3: FECHA Y HORA --- */}
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
                            // value ata el input al dato guardado en memoria.
                            value={datosReserva.fecha}
                            // onChange detecta el cambio en el calendario y guarda la fecha (e.target.value).
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
                        {/* Validación Doble: Deshabilita el botón si falta la fecha O la hora (!fecha || !hora) */}
                        <button onClick={siguientePaso} disabled={!datosReserva.fecha || !datosReserva.hora} className="btn-formulario btn-sig">Siguiente</button>
                    </div>
                </div>
            )}

            {/* --- PASO 4: PAGO --- */}
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

            {/* --- PASO 5: RESUMEN --- */}
            {pasoActual === 5 && (
                <div id="paso-5" className="caja-formulario">
                    <section className="texto">
                        <h2>Confirmar Reserva</h2>
                        <p>Paso 5: Resumen de tu cita</p>
                    </section>
                    
                    <div className="resumen-cita">
                        {/* Inyectamos los datos finales guardados en la memoria del objeto datosReserva */}
                        <p><strong>Servicio:</strong> {datosReserva.servicio}</p>
                        <p><strong>Barbero:</strong> {datosReserva.barbero}</p>
                        <p><strong>Fecha:</strong> {datosReserva.fecha} - {datosReserva.hora}</p>
                        <p><strong>Pago:</strong> {datosReserva.metodoPago}</p>
                        {/* .toLocaleString() formatea el número para ponerle puntos de miles (ej. 25000 -> 25.000) */}
                        <p className="total-resumen"><strong>Total: ${datosReserva.precio.toLocaleString()}</strong></p>
                    </div>

                    <div className="boton grupo-botones">
                        <button onClick={pasoAnterior} className="btn-formulario btn-secundario">Atras</button>
                        {/* El botón final no avanza de paso, sino que dispara la función de confirmarReserva */}
                        <button onClick={confirmarReserva} className="btn-formulario">¡Confirmar Cita!</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Reservas;