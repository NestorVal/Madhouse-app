// --- IMPORTACIONES ---
import React from 'react';
// Importamos nuestro "molde" de tarjeta
import ItemCard from '../components/ItemCard';
// Importamos las imágenes como variables para que React las empaquete correctamente
import barbero1 from '../assets/img/barbero1.png';
import barbero2 from '../assets/img/barbero2.png';
import barbero3 from '../assets/img/barbero3.png';
import barbero4 from '../assets/img/barbero4.png';
import barbero5 from '../assets/img/barbero5.png';
import barbero6 from '../assets/img/barbero6.png';

const Barberos = () => {
    // --- RENDERIZADO VISUAL ---
    return (
        <main className="pagina-barberos">
            <div className="container-general">
                <h1 className="titulo-seccion">Barberos</h1>
                <p className="subtitulo-seccion">Conoce a nuestro equipo de barberos profesionales. Cada uno con su estilo único y años de experiencia para ofrecerte el mejor servicio.</p>
                
                <div className="grid-tarjetas">
                    {/* USO DE PROPS:
                        Llamamos al componente <ItemCard /> múltiples veces.
                        Le pasamos la información específica (imagen, titulo, etc.) como "atributos" (props).
                        El componente recibe estos datos y arma la tarjeta visualmente.
                    */}
                    <ItemCard 
                        imagen={barbero1}
                        titulo="Alexander"
                        descripcion="Especialista en cortes clásicos y modernos con más de 8 años de experiencia. Experto en diseño de barba y afeitado tradicional."
                        precio="Desde $30.000"
                        disponibilidad="Lun-Sáb 9:00-18:00"
                        textoBoton="Ver perfil"
                        linkBoton="#"
                    />
                    <ItemCard 
                        imagen={barbero2}
                        titulo="Cristian"
                        descripcion="Maestro barbero con especialización en estilos contemporáneos. Apasionado por las tendencias y técnicas innovadoras de corte."
                        precio="Desde $30.000"
                        disponibilidad="Mar-Dom 10:00-20:00"
                        textoBoton="Ver perfil"
                        linkBoton="#"
                    />
                    <ItemCard 
                        imagen={barbero3}
                        titulo="Miguel"
                        descripcion="Barbero profesional con 10 años de trayectoria. Especialista en cortes degradados y diseños artísticos de barba."
                        precio="Desde $30.000"
                        disponibilidad="Lun-Vie 8:00-17:00"
                        textoBoton="Ver perfil"
                        linkBoton="#"
                    />
                    <ItemCard 
                        imagen={barbero4}
                        titulo="Carlos"
                        descripcion="Experto en afeitado tradicional con navaja. Ofrece una experiencia auténtica con técnicas heredadas de generaciones."
                        precio="Desde $25.000"
                        disponibilidad="Mié-Dom 11:00-19:00"
                        textoBoton="Ver perfil"
                        linkBoton="#"
                    />
                    <ItemCard 
                        imagen={barbero5}
                        titulo="David"
                        descripcion="Barbero creativo especializado en estilos urbanos y modernos. Ganador de múltiples premios en competencias nacionales."
                        precio="Desde $35.000"
                        disponibilidad="Lun-Sáb 10:00-19:00"
                        textoBoton="Ver perfil"
                        linkBoton="#"
                    />
                    <ItemCard 
                        imagen={barbero6}
                        titulo="Roberto"
                        descripcion="Profesional con enfoque en barbería clásica. Especialista en proporcionar una experiencia relajante y de alta calidad."
                        precio="Desde $25.000"
                        disponibilidad="Mar-Sáb 9:00-18:00"
                        textoBoton="Ver perfil"
                        linkBoton="#"
                    />
                </div>
            </div>
        </main>
    );
};

export default Barberos;