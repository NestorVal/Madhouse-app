// --- IMPORTACIONES ---
import React, { useState, useEffect } from 'react';
// Importamos nuestro "molde" de tarjeta
import ItemCard from '../components/ItemCard';

const Barberos = () => {
    // Estado para almacenar los barberos del servidor
    const [barberos, setBarberos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Obtener imagen - Si tiene foto en BD la convierte de base64, sino retorna un placeholder
    const obtenerImagen = (fotoBarbero) => {
        if (!fotoBarbero || fotoBarbero === "null" || fotoBarbero === "") {
            return "https://via.placeholder.com/300x400?text=Barbero"; // Imagen placeholder
        }
        if (fotoBarbero.startsWith('data:image')) {
            return fotoBarbero;
        }
        return `data:image/png;base64,${fotoBarbero}`;
    };

    // Cargar barberos desde la API
    useEffect(() => {
        const cargarBarberos = async () => {
            try {
                const respuesta = await fetch('http://localhost:8081/api/usuarios/barberos');
                if (!respuesta.ok) {
                    throw new Error('Error al cargar los barberos');
                }
                const datos = await respuesta.json();
                setBarberos(datos);
                setCargando(false);
            } catch (err) {
                setError(err.message);
                setCargando(false);
            }
        };

        cargarBarberos();
    }, []);

    // Renderizado con carga
    if (cargando) {
        return (
            <main className="pagina-barberos">
                <div className="container-general">
                    <h1 className="titulo-seccion">Barberos</h1>
                    <p>Cargando barberos...</p>
                </div>
            </main>
        );
    }

    // Renderizado con error
    if (error) {
        return (
            <main className="pagina-barberos">
                <div className="container-general">
                    <h1 className="titulo-seccion">Barberos</h1>
                    <p style={{ color: 'red' }}>Error: {error}</p>
                </div>
            </main>
        );
    }

    // --- RENDERIZADO VISUAL ---
    return (
        <main className="pagina-barberos">
            <div className="container-general">
                <h1 className="titulo-seccion">Barberos</h1>
                <p className="subtitulo-seccion">Conoce a nuestro equipo de barberos profesionales. Cada uno con su estilo único y años de experiencia para ofrecerte el mejor servicio.</p>
                
                <div className="grid-tarjetas">
                    {/* Renderizar cada barbero con su información */}
                    {barberos.map((barbero) => (
                        <ItemCard 
                            key={barbero.id}
                            imagen={obtenerImagen(barbero.foto)}
                            titulo={`${barbero.nombre} ${barbero.apellido}`}
                            descripcion={barbero.biografia || "Barbero profesional de MADHOUSE con alta experiencia y dedicación al oficio."}
                            precio={barbero.especialidad ? `Especialidad: ${barbero.especialidad}` : "Especialista en cortes"}
                            disponibilidad="Consulta disponibilidad"
                            textoBoton="Ver perfil"
                            linkBoton={`/perfil-barbero/${barbero.id}`}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Barberos;