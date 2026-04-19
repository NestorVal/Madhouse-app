import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CrearServicio = () => {
    const navigate = useNavigate();

    // 1. ESTADOS PARA LOS CAMPOS
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [duracion, setDuracion] = useState('');
    const [foto, setFoto] = useState(null); 

    // --- NUEVA LÓGICA: CONVERTIR FOTO A BASE64 ---
    const manejarCambioFoto = (e) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onloadend = () => {
                setFoto(lector.result); // Guardamos la cadena de texto de la imagen
            };
            lector.readAsDataURL(archivo);
        }
    };

    // 2. FUNCIÓN PARA ENVIAR A SPRING BOOT
    const manejarEnvio = async (e) => {
        e.preventDefault(); 

        // VALIDACIÓN ESTRICTA (JavaScript)
        if (!nombre || !descripcion || !precio || !duracion) {
            Swal.fire('Campos incompletos', 'Por favor llena todos los datos del servicio.', 'warning');
            return;
        }

        try {
            const respuesta = await fetch('http://localhost:8081/api/servicios/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: parseFloat(precio), 
                    duracion: parseInt(duracion),
                    foto: foto // Enviamos la foto en Base64
                })
            });

            if (respuesta.ok) {
                Swal.fire({
                    title: '¡Servicio Creado!',
                    text: 'El servicio ya está disponible en el catálogo.',
                    icon: 'success',
                    confirmButtonColor: '#C69C3B'
                }).then(() => {
                    navigate('/dashboard-barbero'); 
                });
            } else {
                Swal.fire('Error', 'No se pudo crear el servicio.', 'error');
            }
        } catch (error) {
            Swal.fire('Error de conexión', 'No hay comunicación con el servidor.', 'error');
        }
    };

    return (
        <main className="pagina-fondo-gris">
            <div className="container-reserva" style={{ paddingTop: '40px' }}>
                <Link to="/dashboard-barbero" className="link-volver">← Volver al Dashboard</Link>
                
                <form className="caja-formulario" onSubmit={manejarEnvio}>
                    <section className="texto texto-centro">
                        <h2>Crear Nuevo Servicio</h2>
                        <p>Añade un servicio al catálogo general</p>
                    </section>
                    
                    <div className="campos-formulario">
                        {/* --- NUEVO CAMPO: SUBIR IMAGEN --- */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                            {foto ? (
                                <img 
                                    src={foto} 
                                    alt="Vista previa" 
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px', border: '2px solid #C69C3B' }} 
                                />
                            ) : (
                                <div style={{ width: '150px', height: '150px', backgroundColor: '#e9ecef', borderRadius: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c757d' }}>
                                    Sin imagen
                                </div>
                            )}
                            <label htmlFor="foto-servicio" className="btn-formulario btn-secundario" style={{ cursor: 'pointer', textAlign: 'center' }}>
                                📷 Seleccionar Foto
                                <input 
                                    id="foto-servicio"
                                    type="file" 
                                    accept="image/*"
                                    onChange={manejarCambioFoto}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>

                        <label>Nombre del Servicio *</label>
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Tinte de Barba" required />

                        <label>Descripción *</label>
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Detalla lo que incluye el servicio..." rows="3" className="input-lila" required></textarea>

                        <label>Precio (COP) *</label>
                        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej. 25000" required />

                        <label>Duración (Minutos) *</label>
                        <input type="number" value={duracion} onChange={(e) => setDuracion(e.target.value)} placeholder="Ej. 45" required />
                    </div>

                    <div className="boton mt-20">
                        <button type="submit" className="btn-formulario">Guardar Servicio</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CrearServicio;