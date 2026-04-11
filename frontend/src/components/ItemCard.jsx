import React from 'react';
import { Link } from 'react-router-dom';

// PROPS (PROPIEDADES): 
// Entre los paréntesis recibimos un objeto con "variables dinámicas". 
// Esto permite que el mismo componente muestre a un barbero, un shampoo o un corte de cabello dependiendo de qué datos le enviemos desde afuera.
const ItemCard = ({ imagen, titulo, descripcion, precio, duracion, disponibilidad, textoBoton, linkBoton }) => {
    
    return (
        <div className="tarjeta-item">
            {/* Inyectamos las props en las etiquetas usando llaves {} */}
            <img src={imagen} alt={titulo} className="img-tarjeta" />
            
            <div className="contenido-tarjeta">
                <h3>{titulo}</h3>
                
                <p className="label-tarjeta">Descripción:</p>
                <p className="desc-tarjeta">{descripcion}</p>
                
                {/* TERNARIO: Si recibimos la prop 'disponibilidad' (es un barbero), mostramos el texto "Precio base:". Si no (es producto/servicio), mostramos "Precio:" */}
                <p className="label-tarjeta">{disponibilidad ? 'Precio base:' : 'Precio:'}</p>
                <p className="precio-tarjeta">{precio}</p>
                
                {/* 2. RENDERIZADO CONDICIONAL SIMPLE (Operador &&) */}
                {/* Preguntamos: ¿Nos enviaron el dato de "duración"? 
                    SI ES VERDAD: Dibuja todo el bloque de <div className="extra-tarjeta">. 
                    SI ES FALSO (ej. es un barbero y no tiene duración): React ignora este bloque por completo. */}
                {duracion && (
                    <div className="extra-tarjeta">
                        <span className="icono-reloj">⏱</span>
                        <div>
                            <p className="label-tarjeta">Duración estimada:</p>
                            <p>{duracion}</p>
                        </div>
                    </div>
                )}

                {/* Misma lógica: Si existe el dato 'disponibilidad', dibuja este bloque. Si no, ignóralo. */}
                {disponibilidad && (
                    <div className="extra-tarjeta">
                        <span className="icono-reloj">🕒</span>
                        <div>
                            <p className="label-tarjeta">Disponibilidad:</p>
                            <p>{disponibilidad}</p>
                        </div>
                    </div>
                )}

                {/* El botón de acción que usa las props para saber qué texto mostrar y a dónde redirigir */}
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