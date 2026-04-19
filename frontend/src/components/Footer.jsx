//IMPORTACIONES BÁSICAS
import React from 'react';

const Footer = () => {
    // Renderizado del footer con columnas de información
    return (
        <footer>
            <div>
                {/* Grid del footer con información de empresa, horarios y contacto */}
                <div id="footer-container">
                    
                    {/* Columna: Información de la empresa y ubicación */}
                    <div>
                        <h3>Madhouse</h3>       
                        <p id="lema">Estilo, calidad y profesionalismo en cada servicio</p>
                        <div id="ubicacion">
                            {/* Ícono de ubicación en SVG */}
                            <svg width="40px" height="40px" viewBox="-3.2 -3.2 38.40 38.40" fill="#000000">
                                <g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g>
                                <g>
                                    <path d="M116,426 C114... (Código del dibujo del Pin)" fill="#c69c3b" transform="translate(-104.000000, -411.000000)"></path>
                                </g>
                            </svg>
                            <p>Av. Principal 123 Centro, Ciudad Bogota</p>
                        </div>    
                        {/* Link a Google Maps que abre en nueva pestaña */}
                        <a href="https://maps.google.com" target="_blank" rel="noreferrer">Ver en el mapa -</a>
                    </div>
                    
                    {/* Columna: Horarios de atención */}
                    <div>
                        <h3>Horarios</h3>
                        <div id="horarios">
                            {/* Ícono de reloj en SVG */}
                            <svg width="50px" height="50px" viewBox="-2.4 -2.4 28.80 28.80" fill="none">
                                <path d="M12 7V12H15M21... (Código del dibujo del reloj)" stroke="#C69C3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <div>
                                <p>Lunes a Viernes: 9:00 AM - 8:00 PM</p>
                                <p>Sábado: 10:00 AM - 6:00 PM</p>
                                <p>Domingo: Cerrado</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Columna: Información de contacto */}
                    <div>
                        <h3>Contactanos</h3>
                        <div id="contacto">
                            <div id="telefono">
                                <p>Tel: +57 123-456-7890</p>
                            </div>
                            <div id="email">
                                <p>Email: info@madhouse.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Fila final: Copyright */}
                <div id="copyright">
                    <span id="linea"></span>
                    <p>Copyright © 2024 Madhouse Barberia. Todos los derechos reservados.</p>       
                </div>
             </div>
        </footer>
    );
};

export default Footer;