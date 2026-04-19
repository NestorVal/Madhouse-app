import React from 'react';
import { Link } from 'react-router-dom';

// Recibe props: imagen, título, descripción, precio, duración, disponibilidad, botón
// El mismo componente muestra barberos, servicios o productos según las props enviadas
const ItemCard = ({ imagen, titulo, descripcion, precio, duracion, disponibilidad, textoBoton, linkBoton }) => {
    
    return (
        <div className="tarjeta-item">
            {/* Mostrar imagen, título y descripción */}
            <img src={imagen} alt={titulo} className="img-tarjeta" />
            
            <div className="contenido-tarjeta">
                <h3>{titulo}</h3>
                
                <p className="label-tarjeta">Descripción:</p>
                <p className="desc-tarjeta">{descripcion}</p>
                
                {/* Mostrar "Precio base:" para barberos o "Precio:" para servicios */}
                <p className="label-tarjeta">{disponibilidad ? 'Precio base:' : 'Precio:'}</p>
                <p className="precio-tarjeta">{precio}</p>
                
                {/* Mostrar duración solo si existe (para servicios) */}
                {duracion && (
                    <div className="extra-tarjeta">
                        <span className="icono-reloj">⏱</span>
                        <div>
                            <p className="label-tarjeta">Duración estimada:</p>
                            <p>{duracion}</p>
                        </div>
                    </div>
                )}

                {/* Mostrar disponibilidad solo si existe (para barberos) */}
                {disponibilidad && (
                    <div className="extra-tarjeta">
                        <span className="icono-reloj">🕒</span>
                        <div>
                            <p className="label-tarjeta">Disponibilidad:</p>
                            <p>{disponibilidad}</p>
                        </div>
                    </div>
                )}

                {/* Botón de acción que redirige según el link */}
                <div className="boton-tarjeta-container">
                    <Link to={linkBoton}>
                        <button className="btn-tarjeta-oscuro">{textoBoton}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;