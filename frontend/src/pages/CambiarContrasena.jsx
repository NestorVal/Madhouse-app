// --- IMPORTACIONES ---
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Librería para alertas profesionales

const CambiarContrasena = () => {
    // --- ESTADO (MEMORIA) ---
    // Usamos un OBJETO en el useState para guardar las tres contraseñas juntas en un solo lugar.
    const [passwords, setPasswords] = useState({
        actual: "",
        nueva: "",
        confirmar: ""
    });

    // --- FUNCIONES LÓGICAS ---
    const manejarEnvio = (e) => {
        // e.preventDefault(): Evita que el navegador recargue la página al enviar el formulario.
        e.preventDefault();
        
        // Validación lógica: Verificamos que la nueva contraseña y su confirmación sean exactamente iguales.
        if(passwords.nueva !== passwords.confirmar) {
            // Si no coinciden, disparamos una alerta de error.
            Swal.fire({
                icon: 'er',
                title: 'Error',
                text: 'Las contraseñas nuevas no coinciden'
            });
            return; // El 'return' corta la ejecución aquí. El código de abajo no se ejecuta.
        }
        
        // Si todo está bien, simulamos el éxito.
        console.log("Cambiando contraseña...");
        Swal.fire({
            icon: 'success',
            title: '¡Contraseña actualizada!',
            text: 'Tu contraseña ha sido modificada correctamente.'
        });
    };

    // --- RENDERIZADO VISUAL ---
    return (
        <main className="pagina-fondo-gris">
            <div className="container-reserva" style={{ paddingTop: '40px' }}>
                <Link to="/perfil-cliente" className="link-volver">← Volver al Perfil</Link>
                
                {/* Conectamos el evento onSubmit a nuestra función manejarEnvio */}
                <form className="caja-formulario" onSubmit={manejarEnvio} style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <section className="texto texto-centro">
                        <h2>Seguridad</h2>
                        <p>Cambiar tu contraseña</p>
                    </section>
                    
                    <div className="campos-formulario">
                        <label>Contraseña Actual</label>
                        {/* onChange: Escucha cada vez que el usuario teclea algo.
                            ...passwords: Hace una copia de las contraseñas que ya teníamos (para no borrarlas).
                            actual: e.target.value: Actualiza solo el campo 'actual' con lo que el usuario escribió.
                        */}
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