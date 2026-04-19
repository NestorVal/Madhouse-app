import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import barberia from '../assets/img/barberia.png';
import barberia2 from '../assets/img/barberia2.png';
import corteCabello from '../assets/img/corte-cabello.png';

const Home = () => {
    // Estado para almacenar los servicios
    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Obtener imagen - Convierte base64 a URL o usa placeholder
    const obtenerImagen = (fotoServicio) => {
        if (!fotoServicio || fotoServicio === "null" || fotoServicio === "") {
            return corteCabello; // Imagen por defecto
        }
        if (fotoServicio.startsWith('data:image')) {
            return fotoServicio;
        }
        return `data:image/png;base64,${fotoServicio}`;
    };

    // Cargar servicios desde la API
    useEffect(() => {
        const cargarServicios = async () => {
            try {
                const respuesta = await fetch('http://localhost:8081/api/servicios');
                if (!respuesta.ok) {
                    throw new Error('Error al cargar los servicios');
                }
                const datos = await respuesta.json();
                // Tomamos solo los primeros 4 servicios para destacados
                setServicios(datos.slice(0, 4));
                setCargando(false);
            } catch (err) {
                console.error('Error:', err);
                setCargando(false);
            }
        };

        cargarServicios();
    }, []);

    return (
        <main>
            <div className="container">
                <div className="columna1">
                    <section className="texto">
                        <h2>Estilo y Elegancia en Cada Corte</h2>
                        <p>Descubre la experiencia unica de Madhouse Barberia. Donde la tradicion se encuentra con el estilo moderno</p>
                    </section>
                    {/* ... (Aquí va tu section class="item" con los iconos de Cortes, Barberos y Atención) ... */}
                    <div className="boton">
                        <Link to="/reservas"><button id="boton-reservar">Reserva tu cita ahora</button></Link>
                    </div>
                </div>
                <div className="columna2">
                    <img src={barberia} alt="Imagen de la barbería" />
                </div>
            </div>

            <div className="container">
                <div className="columna1">
                    <img src={barberia2} alt="Imagen de la barbería" />
                </div>
                <div className="columna2">
                    <section className="texto">
                        <h2>Bienvenido a Madhouse Barberia</h2>
                        <p>En Madhouse Barberia, nos enorgullece ofrecer una experiencia de cuidado personal excepcional...</p>
                        {/* ... (Aquí van tus tarjetas de estadísticas 10+, 5000+, etc) ... */}
                    </section>
                </div>        
            </div>

            <div className="container1">
                <div className="columna1">
                    <section className="texto">
                        <h2>Reserva tu cita ahora!!</h2>
                        <p>No esperes más. Agenda tu proxima visita y disfruta de una experiencia de barberia inigualable</p>
                    </section>
                    <section className="boton">
                        <Link to="/reservas"><button id="boton-reservar">Reservar ahora</button></Link>
                    </section>
                </div>
            </div>

            <div className="container2">
                <section className="texto">
                    <h2>Servicios Destacados</h2>
                </section>
                <section className="tarjetas-servicios">
                    {cargando ? (
                        <p>Cargando servicios...</p>
                    ) : servicios.length > 0 ? (
                        servicios.map((servicio) => (
                            <div key={servicio.idServicio} className="tarjeta-servicio">
                                <img src={obtenerImagen(servicio.foto)} alt={servicio.nombre} />
                                <h3>{servicio.nombre}</h3>
                                <p>{servicio.descripcion}</p>
                                <p style={{ fontWeight: 'bold', color: '#C69C3B' }}>
                                    ${servicio.precio} - {servicio.duracion} min
                                </p>
                                <section className="boton">
                                    <Link to="/reservas" state={{ servicio }}><button id="boton-corte">Reservar ahora</button></Link>
                                </section>
                            </div>
                        ))
                    ) : (
                        <p>No hay servicios disponibles</p>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Home;