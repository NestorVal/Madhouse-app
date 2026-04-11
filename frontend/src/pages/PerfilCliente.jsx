import React from 'react';
import { Link } from 'react-router-dom';
import fotoperfil from '../assets/img/foto-perfil.png';

const PerfilCliente = () => {
    return (
        <div className="container-perfil-cliente">
            <div className="contenido-perfil-cliente">
                <Link to="/dashboard-cliente" className="link-volver">← Volver al Dashboard</Link>

                <section className="texto">
                    <h2>Mi perfil</h2>
                </section>

                <div className="tarjeta-perfil-lila">
                    <div className="avatar-perfil">
                        <img src={fotoperfil} alt="Camilo" />
                        <div className="badge-edit">✎</div>
                    </div>

                    <section className="texto-interno">
                        <h3>Información personal</h3>
                    </section>

                    <div className="datos-cliente">
                        <div className="dato"><strong>Nombre</strong> <span>Camilo Perez</span></div>
                        <div className="dato"><strong>Email</strong> <span>perez.camilo@gmail.com</span></div>
                        <div className="dato"><strong>Teléfono</strong> <span>3132852821</span></div>
                        <div className="dato"><strong>Fecha de nacimiento</strong> <span>15 de Marzo de 1990</span></div>
                    </div>
                </div>

                <div className="tarjeta-perfil-lila">
                    <section className="texto-interno">
                        <h3>Estadísticas personales</h3>
                    </section>
                    <div className="stats-container">
                        <div className="stat-item">
                            <span className="icon">⭐</span>
                            <div><p>Servicios tomados</p><h4>12</h4></div>
                        </div>
                        <div className="stat-item">
                            <span className="icon">⭐</span>
                            <div><p>Puntos de fidelización</p><h4>230</h4></div>
                        </div>
                        <div className="stat-item">
                            <span className="icon">✂</span>
                            <div><p>Barbero favorito</p><h4>Alexander</h4></div>
                        </div>
                    </div>
                </div>

                <div className="acciones-footer-perfil">
                    <div className="boton">
                        <Link to="/cambiar-contrasena">
                            <button id="btn-cambiar-pass" className="btn-full-width">Cambiar contraseña</button>
                        </Link>
                    </div>
                    <div className="boton">
                        <Link to="/editar-perfil">
                            <button id="btn-editar-perfil" className="btn-full-width">Editar perfil</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilCliente;