import React from 'react';
import nosotros from '../assets/img/nosotros.png';

const SobreNosotros = () => {
    return (
        <main className="pagina-nosotros">
            <div className="container-general">
                <h1 className="titulo-seccion texto-centro">Sobre Nosotros</h1>

                {/* Sección Hero: Imagen e Historia */}
                <div className="caja-formulario hero-nosotros">
                    <div className="hero-grid">
                        <img src={nosotros} alt="Equipo Madhouse" className="img-hero-nosotros" />
                        <div className="texto-hero">
                            <h2>Madhouse Barbería</h2>
                            <p>Somos una barbería moderna que combina la tradición del arte de la barbería clásica con las últimas tendencias en estilismo masculino.</p>
                            <p>Nuestro equipo está conformado por profesionales apasionados que se dedican a brindar un servicio excepcional, garantizando que cada cliente salga con el look que desea y la confianza renovada.</p>
                            <p>En Madhouse, no solo nos enfocamos en el corte perfecto, sino en crear una experiencia completa donde puedas relajarte, disfrutar y sentirte como en casa.</p>
                            <p>Utilizamos productos de primera calidad y técnicas especializadas para asegurar que cada servicio supere tus expectativas.</p>
                        </div>
                    </div>
                </div>

                {/* Sección Misión, Visión, Objetivo */}
                <div className="grid-tres-columnas mt-50">
                    <div className="tarjeta-info-blanca">
                        <h3>Misión</h3>
                        <p>Proporcionar servicios de barbería de la más alta calidad, combinando técnicas tradicionales con tendencias modernas.</p>
                        <p>Crear un ambiente acogedor donde cada cliente reciba atención personalizada y profesional.</p>
                        <p>Garantizar la satisfacción mediante el uso de productos premium y un equipo altamente capacitado.</p>
                    </div>
                    <div className="tarjeta-info-blanca">
                        <h3>Visión</h3>
                        <p>Ser reconocidos como la barbería líder en la región, destacando por nuestra excelencia en el servicio y atención al cliente.</p>
                        <p>Expandir nuestra presencia manteniendo los más altos estándares de calidad y profesionalismo.</p>
                        <p>Convertirnos en referente del estilo y la elegancia masculina en nuestra comunidad.</p>
                    </div>
                    <div className="tarjeta-info-blanca">
                        <h3>Objetivo</h3>
                        <p>Superar las expectativas de nuestros clientes en cada visita, ofreciendo un servicio personalizado y de calidad.</p>
                        <p>Mantener un equipo de barberos capacitados y actualizados con las últimas tendencias y técnicas.</p>
                        <p>Fomentar relaciones duraderas con nuestros clientes basadas en la confianza y la satisfacción.</p>
                    </div>
                </div>

                {/* Sección Mapa y Contacto */}
                <div className="grid-dos-columnas mt-50">
                    <div>
                        <h2>Ubicación en el mapa</h2>
                        <div className="caja-mapa">
                            <span className="icono-pin-grande">📍</span>
                            <h3>Madhouse Barbería</h3>
                            <p>Av. Principal 123, Centro<br/>Ciudad, CP 12345</p>
                            <button className="btn-formulario">Abrir en Google Maps</button>
                        </div>
                    </div>
                    <div>
                        <h2>Formulario de Contacto</h2>
                        <form className="tarjeta-info-blanca formulario-contacto">
                            <label>Nombre completo</label>
                            <input type="text" placeholder="Tu nombre" />
                            
                            <label>Email</label>
                            <input type="email" placeholder="tu@email.com" />
                            
                            <label>Teléfono</label>
                            <input type="tel" placeholder="+123 456 7890" />
                            
                            <label>Mensaje</label>
                            <textarea placeholder="Escribe tu mensaje aquí..." rows="4"></textarea>
                            
                            <button type="submit" className="btn-formulario mt-20">✉ ENVIAR</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SobreNosotros;