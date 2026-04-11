import React from 'react';
import { Link } from 'react-router-dom';
import barbero5 from '../assets/img/barbero5.png';
import corte1 from '../assets/img/corte1.png';
import corte2 from '../assets/img/corte2.png';
import corte3 from '../assets/img/corte3.png';
const PerfilBarbero = () => {
    return (
        <main className="pagina-fondo-gris">
            <div className="container-perfil-cliente">
                <div className="contenido-perfil-cliente">
                    <Link to="/dashboard-barbero" className="link-volver">← Volver al Dashboard</Link>

                    <h1 className="titulo-seccion texto-centro mt-20" style={{fontSize: '48px', color: '#121212'}}>Mi perfil</h1>

                    <div className="tarjeta-perfil-lila tarjeta-barbero">
                        <div className="avatar-perfil centrado">
                            <img src={barbero5} alt="Alexander" />
                        </div>

                        <section className="texto-interno">
                            <h3>Información personal</h3>
                        </section>

                        <div className="datos-cliente">
                            <div className="dato"><strong>Nombre</strong> <span>Alexander ramos</span></div>
                            <div className="dato"><strong>Email</strong> <span className="link-correo">alex.perez@gmail.com</span></div>
                            <div className="dato"><strong>Teléfono</strong> <span>3122252421</span></div>
                            <div className="dato"><strong>Fecha de nacimiento</strong> <span>19 de Enero de 1996</span></div>
                        </div>

                        <section className="texto-interno mt-20">
                            <h3>Información profesional</h3>
                        </section>
                        
                        <div className="formulario-profesional">
                            <label>Especialidades</label>
                            <input type="text" value="Corte de pelo  •  Afeitado de barba" readOnly className="input-lila" />

                            <label>Biografía</label>
                            <textarea placeholder="Escribe tu biografía profesional aquí..." rows="4" className="input-lila"></textarea>
                        </div>

                        <section className="texto-interno mt-20">
                            <h3>Galería de trabajos</h3>
                        </section>
                        
                        <div className="galeria-trabajos">
                            <img src={corte1} alt="Trabajo 1" className="img-galeria" />
                            <img src={corte2} alt="Trabajo 2" className="img-galeria" />
                            <img src={corte3} alt="Trabajo 3" className="img-galeria" />
                            <div className="btn-agregar-img">+</div>
                        </div>

                        <div className="boton-centro mt-20">
                            <button className="btn-tarjeta-oscuro btn-ancho">Editar perfil</button>
                        </div>
                    </div>

                    <div className="tarjeta-perfil-lila tarjeta-estadisticas-mini">
                        <h3>Estadísticas generales</h3>
                        <div className="stats-row">
                            <div className="stat-item-row">
                                <span className="icono-grande">✂</span>
                                <div>
                                    <h4 className="numero-medio">49</h4>
                                    <p>Servicios totales</p>
                                </div>
                            </div>
                            <div className="stat-item-row accionable">
                                <span className="icono-plus">+</span>
                                <p>Agregar servicio</p>
                            </div>
                            <div className="stat-item-row estrellas">
                                <span>☆☆☆☆☆</span>
                            </div>
                        </div>
                    </div>

                    <div className="acciones-footer-perfil">
                        <button className="btn-tarjeta-oscuro btn-full-width">Cambiar contraseña</button>
                        <button className="btn-tarjeta-oscuro btn-full-width">Eliminar cuenta</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PerfilBarbero;