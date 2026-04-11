import React from 'react';
import { Link } from 'react-router-dom';
import barberia from '../assets/img/barberia.png';
import barberia2 from '../assets/img/barberia2.png';
import corteCabello from '../assets/img/corte-cabello.png';

const Home = () => {
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
                    <div className="tarjeta-servicio">
                        <img src={corteCabello} alt="Corte de cabello" />
                        <h3>Corte de cabello</h3>
                        <p>Cortes modernos y clásicos adaptados a tu estilo personal.</p>
                        <section className="boton">
                            <Link to="/reservas"><button id="boton-corte">Reservar ahora</button></Link>
                        </section>
                    </div>
                    {/* ... (Agrega aquí las otras tarjetas de servicios) ... */}
                </section>
            </div>
        </main>
    );
};

export default Home;