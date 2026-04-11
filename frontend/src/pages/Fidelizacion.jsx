// --- IMPORTACIONES ---
import React from 'react';
import { Link } from 'react-router-dom';

const Fidelizacion = () => {
    // --- RENDERIZADO VISUAL ---
    return (
        <main className="pagina-fondo-gris">
            <div className="container-general">
                <Link to="/dashboard-cliente" className="link-volver">← Volver al dashboard</Link>
                
                <h1 className="titulo-seccion texto-centro mt-20" style={{color: '#121212'}}>Sistema de fidelización</h1>

                <div className="tarjeta-fidelizacion">
                    {/* SECCIÓN: PUNTOS TOTALES */}
                    <div className="puntos-cabecera">
                        <div className="icono-regalo">🎁</div>
                        <h2 className="puntos-totales">150</h2>
                        <p className="puntos-texto">puntos</p>
                    </div>

                    {/* SECCIÓN: BARRA DE PROGRESO */}
                    <div className="barra-progreso-container">
                        <div className="barra-fondo">
                            {/* width: '75%' es un estilo en línea (inline style) que dicta qué tan llena se ve la barra */}
                            <div className="barra-relleno" style={{width: '75%'}}></div>
                        </div>
                        <p className="texto-progreso">Por cada servicio ganas 10 puntos</p>
                        <h3 className="texto-meta">Cada 200 puntos = 1 servicio básico gratis</h3>
                    </div>

                    <div className="seccion-recompensas">
                        <h3>Recompensas disponibles</h3>
                        <div className="lista-items">
                            <div className="item-fila">
                                <span>Afeitado</span>
                                <strong>300 puntos</strong>
                            </div>
                            <div className="item-fila">
                                <span>Lavado de pelo</span>
                                <strong>400 puntos</strong>
                            </div>
                            <div className="item-fila">
                                <span>Limpieza facial</span>
                                <strong>500 puntos</strong>
                            </div>
                        </div>
                    </div>

                    <div className="seccion-historial">
                        <h3>Historial</h3>
                        <div className="lista-items">
                            <div className="item-fila historial-fila">
                                <span>Puntos totales ganados:</span>
                                <strong>450</strong>
                            </div>
                            <div className="item-fila historial-fila">
                                <span>Puntos canjeados:</span>
                                <strong>300</strong>
                            </div>
                        </div>
                    </div>

                    <div className="boton-centro mt-20">
                        <button className="btn-tarjeta-oscuro btn-ancho">Canjear puntos</button>
                    </div>
                </div>

                <div className="banner-informativo">
                    💡 Acumula puntos con cada servicio y canjéalos por recompensas exclusivas
                </div>
            </div>
        </main>
    );
};

export default Fidelizacion;