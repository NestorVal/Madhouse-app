import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Mantenemos una imagen por defecto por si el servicio en la BD no tiene foto
import placeholderImg from '../assets/img/corte-clasico.png'; 

const Servicios = () => {
    // --- 1. ESTADOS ---
    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);

    // --- 2. CARGA DE DATOS (GET) ---
    useEffect(() => {
        const cargarServicios = async () => {
            try {
                // Petición al backend para traer todos los servicios
                const respuesta = await fetch('http://localhost:8081/api/servicios');
                
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setServicios(datos);
                } else {
                    console.error("Error al cargar el catálogo de servicios");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            } finally {
                setCargando(false); // Apagamos el indicador de carga
            }
        };

        cargarServicios();
    }, []);

    // Obtener imagen - Convierte base64 a URL o usa placeholder
    const obtenerImagen = (fotoServicio) => {
        if (!fotoServicio || fotoServicio === "null" || fotoServicio === "") {
            return placeholderImg;
        }
        if (fotoServicio.startsWith('data:image')) {
            return fotoServicio;
        }
        return `data:image/png;base64,${fotoServicio}`;
    };

    // --- 3. RENDERIZADO VISUAL ---
    return (
        <main className="pagina-servicios">
            <div className="container-general">
                <h1 className="titulo-seccion">Catálogo de Servicios</h1>
                
                {cargando ? (
                    // Mensaje mientras esperamos que Spring Boot responda
                    <div className="texto-centro mt-20"><p>Cargando nuestro catálogo...</p></div>
                ) : (
                    <div className="grid-tarjetas">
                        {/* Verificamos si hay servicios en la BD */}
                        {servicios.length > 0 ? (
                            servicios.map((servicio) => (
                                <div key={servicio.idServicio} className="tarjeta-item">
                                    <img src={obtenerImagen(servicio.foto)} alt={servicio.nombre} className="img-tarjeta" />
                                    
                                    <div className="contenido-tarjeta">
                                        <h3>{servicio.nombre}</h3>
                                        
                                        <p className="label-tarjeta">Descripción:</p>
                                        <p className="desc-tarjeta">{servicio.descripcion}</p>
                                        
                                        <p className="label-tarjeta">Precio:</p>
                                        <p className="precio-tarjeta">$ {servicio.precio.toLocaleString('es-CO')}</p>
                                        
                                        {servicio.duracion && (
                                            <div className="extra-tarjeta">
                                                <span className="icono-reloj">⏱</span>
                                                <div>
                                                    <p className="label-tarjeta">Duración estimada:</p>
                                                    <p>{servicio.duracion} min</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* El botón con Link que pasa el servicio como state */}
                                        <div className="boton-tarjeta-container">
                                            <Link to="/reservas" state={{ servicio }}>
                                                <button className="btn-tarjeta-oscuro">Reservar</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="texto-centro mt-20" style={{gridColumn: '1 / -1'}}>
                                <p>Pronto añadiremos nuevos servicios a nuestro catálogo.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* NOTA: He ocultado temporalmente la sección estática de "Productos" 
                    Si en tu base de datos agregas una columna 'categoria' (Servicio o Producto), 
                    podemos dividirlos automáticamente usando un .filter() más adelante. */}
            </div>
        </main>
    );
};

export default Servicios;