//IMPORTACIONES: Traemos las herramientas y archivos que este componente necesita para funcionar.
import React, { useState } from 'react'; // 'useState' es la herramienta para darle "memoria" al componente.
import { Link } from 'react-router-dom'; // 'Link' es el enrutador que nos permite cambiar de página sin recargar.
import baebero5 from '../assets/img/barbero5.png'; // Importamos la imagen de perfil como si fuera una variable.

const Header = () => {
    //ESTADO (MEMORIA DEL COMPONENTE): 
    // Creamos una variable 'usuarioLogueado' que inicia en 'true'. 
    // 'setUsuarioLogueado' es la función que usaremos más adelante para cambiar este valor a 'false' al cerrar sesión.
    const [usuarioLogueado, setUsuarioLogueado] = useState(false);

    //RENDERIZADO (LO QUE SE MUESTRA EN PANTALLA)
    return (
        <header>
            {/* El título principal funciona como un botón para volver al inicio */}
            <h1><Link to="/home" className="madhouse-link">MADHOUSE</Link></h1>
            
            {/* Navegación principal de la página */}
            <nav>
                <ul>
                    {/* Usamos <Link to="..."> en lugar de <a href="..."> de HTML */}
                    <li><Link to="/servicios">Productos y Servicios</Link></li>
                    <li><Link to="/barberos">Barberos</Link></li>
                    <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
                </ul>
            </nav>
            
            <div className="boton">
                {/*RENDERIZADO CONDICIONAL (EL OPERADOR TERNARIO) */}
                {/* Preguntamos: ¿usuarioLogueado es verdadero? */}
                {usuarioLogueado ? (
                    
                    // SI ES VERDADERO: Mostramos el nombre y la foto de perfil
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontWeight: 'bold', color: '#121212' }}>Camilo Perez</span>
                        <Link to="/dashboard-cliente">
                            {/* Inyectamos la imagen que importamos arriba usando llaves {} */}
                            <img 
                                src={baebero5} 
                                alt="Perfil" 
                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C69C3B' }} 
                            />
                        </Link>
                    </div>

                ) : (
                    
                    // SI ES FALSO (No hay sesión): Mostramos los botones de ingreso y registro
                    // Los fragmentos <> y </> sirven para agrupar elementos sin crear un <div> extra innecesario.
                    <>
                        <Link to="/login"><button id="boton-inicio-sesion">Iniciar Sesion</button></Link>
                        <Link to="/registro"><button id="boton-registrarse">Registrarse</button></Link>
                    </>

                )}
            </div>
        </header>
    );
};

// 5. EXPORTACIÓN: Hacemos que este componente sea público para que App.js lo pueda usar.
export default Header;