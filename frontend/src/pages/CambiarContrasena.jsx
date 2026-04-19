import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Librería para alertas profesionales

const CambiarContrasena = () => {
    // Estado para las tres contraseñas
    const [passwords, setPasswords] = useState({
        actual: "",
        nueva: "",
        confirmar: ""
    });

    // Validar y cambiar contraseña
    const manejarEnvio = (e) => {
        e.preventDefault();
        // Verificar que las contraseñas coincidan
        if(passwords.nueva !== passwords.confirmar) {
            Swal.fire({
                icon: 'er',
                title: 'Error',
                text: 'Las contraseñas nuevas no coinciden'
            });
            return;
        }
        // Simular cambio exitoso
        console.log("Cambiando contraseña...");
        Swal.fire({
            icon: 'success',
            title: '¡Contraseña actualizada!',
            text: 'Tu contraseña ha sido modificada correctamente.'
        });
    };

    return (
        <main className="pagina-fondo-gris">
            <div className="container-reserva" style={{ paddingTop: '40px' }}>
                <Link to="/perfil-cliente" className="link-volver">← Volver al Perfil</Link>
                
                <form className="caja-formulario" onSubmit={manejarEnvio} style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <section className="texto texto-centro">
                        <h2>Seguridad</h2>
                        <p>Cambiar tu contraseña</p>
                    </section>
                    
                    <div className="campos-formulario">
                        <label>Contraseña Actual</label>
                        {/* Actualizar campo de contraseña actual */}
                        <input type="password" placeholder="Ingresa tu contraseña actual" 
                            onChange={(e) => setPasswords({...passwords, actual: e.target.value})} required />

                        <label>Nueva Contraseña</label>
                        <input type="password" placeholder="Mínimo 8 caracteres" 
                            onChange={(e) => setPasswords({...passwords, nueva: e.target.value})} required />

                        <label>Confirmar Nueva Contraseña</label>
                        <input type="password" placeholder="Repite la nueva contraseña" 
                            onChange={(e) => setPasswords({...passwords, confirmar: e.target.value})} required />
                    </div>

                    <div className="boton mt-20">
                        <button type="submit" className="btn-formulario" style={{ width: '100%' }}>Actualizar Contraseña</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CambiarContrasena;