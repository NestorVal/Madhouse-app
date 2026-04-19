import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatarPlaceholder from '../assets/img/avatar-placeholder.png';

const Header = () => {
    // Guardar usuario en memoria al cargar
    const [usuario, setUsuario] = useState(null);
    const fotoDefault = avatarPlaceholder;
    
    // Convertir foto base64 o usar placeholder por defecto
    const obtenerImagen = (fotoUsuario) => {
        if (!fotoUsuario || fotoUsuario === "null" || fotoUsuario === "") return avatarPlaceholder;
        if (fotoUsuario.startsWith('data:image')) return fotoUsuario;
        return `data:image/png;base64,${fotoUsuario}`;
    };

    // Buscar usuario en localStorage al cargar el componente
    useEffect(() => {
        const usuarioLocal = localStorage.getItem("usuario");
        if (usuarioLocal) {
            setUsuario(JSON.parse(usuarioLocal));
        }
    }, []);

    // Redirigir al dashboard correcto según el rol
    const rutaDashboard = usuario?.rol === 'ROLE_BARBERO' ? '/dashboard-barbero' : '/dashboard-cliente';

    return (
        <header>
            <h1><Link to="/home" className="madhouse-link">MADHOUSE</Link></h1>
            
            <nav>
                <ul>
                    <li><Link to="/servicios">Productos y Servicios</Link></li>
                    <li><Link to="/barberos">Barberos</Link></li>
                    <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
                </ul>
            </nav>
            
            <div className="boton">
                {/* Si hay sesión: mostrar nombre y foto; si no: botones de login/registro */}
                {usuario ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontWeight: 'bold', color: '#fffff' }}>
                            {usuario.nombre} {usuario.apellido}
                        </span>
                        <Link to={rutaDashboard}>
                            <img 
                                className="foto-perfil-header"
                                src={obtenerImagen(usuario.foto)} 
                                alt="Perfil" 
                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C69C3B' }} 
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/login"><button id="boton-inicio-sesion">Iniciar Sesion</button></Link>
                        <Link to="/registro"><button id="boton-registrarse">Registrarse</button></Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;